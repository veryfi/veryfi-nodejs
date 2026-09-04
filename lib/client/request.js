const Client = require('../client/constructor');
const { Readable } = require('stream');

/**
 * Convert a Node.js Readable stream to a Buffer.
 * @private
 * @param {stream.Readable} stream
 * @returns {Promise<Buffer>}
 */
async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}

/**
 * Submit the HTTP request.
 * @private
 * @param {string} http_verb HTTP Method
 * @param {string} endpoint_name Endpoint name such as 'documents', 'users', etc.
 * @param {{}} request_arguments JSON payload to send to Veryfi
 * @param params {{}} query params.
 * @param {Boolean} has_files Are there any files to be submitted as binary
 * @param {Object} options Optional request options
 * @param {string} [options.api_version] Override the default API version (v8)
 * @param {boolean} [options.skip_partner] Skip the /partner path segment (used by some v1 routes)
 * @returns {JSON} A JSON of the response data.
 */
Client.prototype._request = async function (http_verb, endpoint_name, request_arguments, params = {}, has_files = false, options = {}) {
    let headers = this._get_headers(has_files);
    let api_version = (options && options.api_version) ? options.api_version : this.api_version;
    let partner = (options && options.skip_partner) ? "" : "/partner";
    let api_url = `${this.base_url}api/${api_version}${partner}${endpoint_name}`;

    if (params && Object.keys(params).length > 0) {
        const query = new URLSearchParams(
            Object.entries(params).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])
        ).toString();
        if (query) {
            api_url += `?${query}`;
        }
    }

    if (this.client_secret) {
        let timestamp = Date.now();
        let signature = this._generate_signature(request_arguments, timestamp);
        headers = Object.assign(headers, {
            "X-Veryfi-Request-Timestamp": timestamp,
            "X-Veryfi-Request-Signature": signature
        });
    }

    let body;
    if (has_files) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(request_arguments)) {
            if (value == null) continue;
            if (key === "file") {
                const buf = value instanceof Readable ? await streamToBuffer(value) : Buffer.from(value);
                formData.append(key, new Blob([buf]));
            } else {
                formData.append(key, value.toString());
            }
        }
        // Let fetch set Content-Type with boundary automatically
        delete headers["Content-Type"];
        body = formData;
    } else {
        body = JSON.stringify(request_arguments);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout * 1000);

    try {
        const response = await fetch(api_url, {
            method: http_verb,
            headers: headers,
            body: ["GET", "HEAD"].includes(http_verb.toUpperCase()) ? undefined : body,
            signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${JSON.stringify(data)}`);
        }
        return { data };
    } catch (err) {
        if (err.name === 'AbortError') {
            throw new Error(`Error: Request timed out after ${this.timeout} seconds`);
        }
        throw err;
    } finally {
        clearTimeout(timeoutId);
    }
}
