const Client = require('../client/Client');
const axios = require('axios').default;
const FormData = require('form-data');
const {promisify} = require("util");

/**
 * Submit the HTTP request.
 * @private
 * @param {string} http_verb HTTP Method
 * @param {string} endpoint_name Endpoint name such as 'documents', 'users', etc.
 * @param {{}} request_arguments JSON payload to send to Veryfi
 * @param params {{}} query params.
 * @param {Boolean} has_files Are there any files to be submitted as binary
 * @returns {JSON} A JSON of the response data.
 */
Client.prototype._request = async function (http_verb, endpoint_name, request_arguments, params = {}, has_files = false) {
    let headers = this._get_headers(has_files);
    let api_url = `${this._get_url()}/partner${endpoint_name}`;

    if (this.client_secret) {
        let timestamp = Date.now();
        let signature = this._generate_signature(request_arguments, timestamp);
        headers = Object.assign(headers, {
            "X-Veryfi-Request-Timestamp": timestamp,
            "X-Veryfi-Request-Signature": signature
        });
    }

    if (has_files) {
        const formData = new FormData();
        for (const key in request_arguments) {
            if (request_arguments.hasOwnProperty(key)) {
                const value = request_arguments[key];
                formData.append(key, value);
            }
        }
        headers = Object.assign(headers, formData.getHeaders());
        const getLength = promisify(formData.getLength).bind(formData);
        headers['Content-Length'] = await getLength()
        request_arguments = formData;
    } else {
        request_arguments = JSON.stringify(request_arguments);
    }
    try {
        return await axios.request({
            method: http_verb,
            url: api_url,
            headers: headers,
            data: request_arguments,
            timeout: this.timeout * 1000,
            params: params
        });
    } catch (response) {
        let errorStatus = response?.response?.status;
        let errorInfo = response?.response?.data?.error;
        let message = response?.message;
        throw new Error(`Error: ${errorStatus} ${errorInfo} ${message}`);
    }
}
