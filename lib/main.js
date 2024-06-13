const {createHmac} = require('crypto');
const axios = require('axios').default;
const path = require('path');
const FormData = require('form-data');
const fs = require('fs');
const {promisify} = require("util");

/**
 * Create instance of a Client
 * @class
 * @param {string} client_id Your Veryfi client id
 * @param {string | undefined} client_secret Your Veryfi client secret
 * @param {string} username Your Veryfi username
 * @param {string} api_key Your Veryfi API key
 * @param {string} base_url
 * @param {string} api_version
 * @param {Number} timeout
 */
function Client(
    client_id,
    client_secret,
    username,
    api_key,
    base_url = "https://api.veryfi.com/",
    api_version = "v8",
    timeout = 120) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.username = username;
    this.api_key = api_key;
    this.base_url = base_url;
    this.timeout = timeout;
    this.api_version = api_version;
    this.CATEGORIES = [
        "Advertising & Marketing",
        "Automotive",
        "Bank Charges & Fees",
        "Legal & Professional Services",
        "Insurance",
        "Meals & Entertainment",
        "Office Supplies & Software",
        "Taxes & Licenses",
        "Travel",
        "Rent & Lease",
        "Repairs & Maintenance",
        "Payroll",
        "Utilities",
        "Job Supplies",
        "Grocery",
    ];
}

/**
 * Check api version for w2 documents
 * @private
 * @throws error when api_version is different to v8
 */
Client.prototype._check_w2_version = function () {
    if (this.api_version !== "v8") throw Error("w2 is only supported on v8")
}

/**
 * Prepares the headers needed for a request.
 * @private
 * @param {Boolean} has_files Are there any files to be submitted as binary
 * @return {Object} Dictionary with headers
 */
Client.prototype._get_headers = function (has_files = false) {
    let final_headers = {
        "User-Agent": "Node.js Veryfi-Nodejs/1.3.2",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Client-Id": this.client_id,
        "Authorization": `apikey ${this.username}:${this.api_key}`,
    };
    if (has_files) {
        final_headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return final_headers;
}

/**
 * Get API Base URL with API Version
 * @private
 * @returns {string} Base URL to Veryfi API
 */
Client.prototype._get_url = function () {
    return this.base_url + "api/" + this.api_version;
}

/**
 * Generate unique signature for payload params.
 * @private
 * @param {{}} payload_params JSON params to be sent to API request
 * @param {Number} timestamp Unix Long timestamp
 * @returns {string} Unique signature generated using the client_secret and the payload
 */
Client.prototype._generate_signature = function (payload_params, timestamp) {
    let payload = `timestamp:${timestamp}`;
    for (let i = 0; i < Object.keys(payload_params).length; i++) {
        let key = Object.keys(payload_params)[i];
        let value = payload_params[key];
        payload = `${payload},${key}:${value}`;
    }
    const secret_bytes = encodeURI(this.client_secret);
    const payload_bytes = encodeURI(payload);
    let hmac = createHmac('sha256', secret_bytes);
    hmac.update(payload_bytes);
    let tmp_signature = hmac.digest();
    let base64_signature = Buffer.from(tmp_signature).toString('base64');
    base64_signature = Buffer.from(base64_signature).toString('utf-8').trim();

    return base64_signature;
}

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


/**
 * Get JSON of documents
 * @memberof Client
 * @returns {JSON} JSON object of previously processed documents
 */
Client.prototype.get_documents = async function (
    page = 1,
    page_size = 50,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {
    let endpoint_name = "/documents/";
    let request_arguments = {};
    let documents = await this._request("GET", endpoint_name, request_arguments);
    if ("data" in documents) {
        documents = documents["data"];
    }
    return documents;
}

/**
 * Retrieve document by ID
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to retrieve
 * @returns {JSON} Data extracted from the Document
 */
Client.prototype.get_document = async function (document_id) {
    let endpoint_name = `/documents/${document_id}/`;
    let request_arguments = {"id": document_id};
    let document = await this._request("GET", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Process a document and extract all the fields from it
 * @example
 * veryfi_client.process_document('file/path',
 *                                ['Entertainment','Food'],
 *                                true,
 *                                {"extra":"parameters"})
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {Array} categories List of categories Veryfi can use to categorize the document
 * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_document = async function (
    file_path,
    categories = null,
    delete_after_processing = false,
    {...kwargs} = {}
) {

    let endpoint_name = "/documents/";
    if (!categories) {
        categories = this.CATEGORIES;
    }
    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    let request_arguments = {
        "file_name": file_name,
        "file_data": base64_encoded_string,
        "categories": categories,
        "auto_delete": delete_after_processing,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Process a document and extract all the fields from it
 * @example
 * veryfi_client.process_document_stream('ReadStream',
 *                                'receipt.png',
 *                                ['Entertainment','Food'],
 *                                true,
 *                                {'extra': 'parameters'})
 *
 * @memberof Client
 * @param {ReadStream} file ReadStream of a file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {Array} categories List of categories Veryfi can use to categorize the document
 * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_document_stream = async function (
    file,
    file_name,
    delete_after_processing = false,
    {...kwargs} = {}
) {

    let endpoint_name = "/documents/";

    let request_arguments = {
        "file_name": file_name,
        "file": file,
        "auto_delete": delete_after_processing.toString(),
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, {}, true);
    return document['data'];
}

/**
 * Process a document and extract all the fields from it
 * @example
 * veryfi_client.process_document_base64string('base64_encoded_string',
 *                                'receipt.png',
 *                                ['Entertainment','Food'],
 *                                true,
 *                                {'extra': 'parameters'})
 *
 * @memberof Client
 * @param {String} base64_encoded_string Buffer string of a file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {Array} categories List of categories Veryfi can use to categorize the document
 * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_document_base64string = async function (
    base64_encoded_string,
    file_name,
    categories = null,
    delete_after_processing = false,
    {...kwargs} = {}
) {

    let endpoint_name = "/documents/";
    if (!categories) {
        categories = this.CATEGORIES;
    }
    let request_arguments = {
        "file_name": file_name,
        "file_data": base64_encoded_string,
        "categories": categories,
        "auto_delete": delete_after_processing,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Process document from url and extract all the fields from it.
 * @example
 * veryfi_client.process_document_url('https://cdn.example.com/receipt.jpg')
 *
 * @memberof Client
 * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
 * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
 * @param {Array} categories List of categories to use when categorizing the document
 * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {int} boost_mode Flag that tells Veryfi whether boost mode should be enabled. When set to 1, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is 0
 * @param {string} external_id Optional custom document identifier. Use this if you would like to assign your own ID to documents
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_document_url = async function (
    file_url = "",
    file_urls = null,
    categories = null,
    delete_after_processing = false,
    boost_mode = 0,
    external_id = "",
    max_pages_to_process = 1,
    {...kwargs} = {},
) {
    let endpoint_name = "/documents/";
    if (!categories) {
        categories = this.CATEGORIES;
    }
    let request_arguments = {
        "auto_delete": delete_after_processing,
        "boost_mode": boost_mode,
        "categories": categories,
        "external_id": external_id,
        "file_url": file_url,
        "file_urls": file_urls,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Delete document from Veryfi
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_document = async function (document_id) {
    let endpoint_name = `/documents/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}

/**
 * Update data for a previously processed document, including almost any field like `vendor`, `date`, `notes` and etc.
 * @example
 * veryfi_client.update_document(id, {date:"2021-01-01", notes:"look what I did"})
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to update
 * @param {Object} kwargs fields to update
 * @return {JSON} A document json with updated fields, if fields are writable. Otherwise a document with unchanged fields.
 */
Client.prototype.update_document = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}

/**
 * Get all w2 documents.
 * @memberOf Client
 * @param {int} page number, response is capped to maximum of 50 results per page.
 * @return {Array} An array of JSON with all w2 documents.
 */
Client.prototype.get_w2_documents = async function (page = null) {
    this._check_w2_version();
    let endpoint_name = "/w2s/";
    let request_arguments = {};
    let params = {};
    if (page !== null) {
        params = {"page": page};
    }
    let response = await this._request("GET", endpoint_name, request_arguments, params);
    return response['data']['results'];
}

/**
 * Get a w2 document
 * @memberOf Client
 * @param {string} document_id ID of the document you'd like to retrieve
 * @returns {JSON} Data extracted from the Document
 */
Client.prototype.get_w2_document = async function (
    document_id,
) {
    this._check_w2_version();
    let endpoint_name = `/w2s/${document_id}/`;
    let request_arguments = {"id": document_id};
    let response = await this._request("GET", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Upload a document from a buffer.
 * @memberOf Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_buffer Buffer of a file to submit for data extraction
 * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w2_document_from_buffer = async function (
    file_name,
    file_buffer,
    delete_after_processing = null,
    max_pages_to_process = null,
    {...kwargs} = {}
) {
    this._check_w2_version()
    let endpoint_name = "/w2s/"
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_buffer,
        "auto_delete": delete_after_processing,
        "max_pages_to_process": max_pages_to_process,
    }
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Upload a document from a file path
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w2_document = async function (
    file_path,
    delete_after_processing = false,
    max_pages_to_process = 1,
    {...kwargs} = {}
) {
    const file_name = path.basename(file_path)
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'})
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8')
    return this.process_w2_document_from_buffer(
        file_name,
        base64_encoded_string,
        delete_after_processing,
        max_pages_to_process,
        kwargs
    );
}

/**
 * Process a w2 document from an url.
 * @memberOf Client
 * @param {String} file_name The file name including the extension
 * @memberof Client
 * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
 * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
 * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w2_document_from_url = async function (
    file_name,
    file_url,
    file_urls = null,
    delete_after_processing = false,
    max_pages_to_process = 1,
    {...kwargs} = {}
) {
    this._check_w2_version()
    let endpoint_name = "/w2s/"
    let request_arguments = {
        "file_name": file_name,
        "auto_delete": delete_after_processing,
        "file_url": file_url,
        "file_urls": file_urls,
        "max_pages_to_process": max_pages_to_process
    }
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Add a new tag on an existing document
 *
 * @param {number} document_id ID of the document you'd like to add a Tag
 * @param {string} tag name to add
 * @return {JSON} response about tag added.
 */
Client.prototype.add_tag = async function (document_id, tag) {
    let endpoint_name = `/documents/${document_id}/tags/`;
    let request_arguments = {"name": tag};
    let response = await this._request("PUT", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Delete all the tags on an existing document
 *
 * @param {number} document_id ID of the document you'd like to delete tags
 * @return {JSON} response about deleted tags.
 */
Client.prototype.delete_tags = async function (document_id) {
    let endpoint_name = `/documents/${document_id}/tags/`;
    let request_arguments = {};
    return this._request("DELETE", endpoint_name, request_arguments);
}

/**
 * Replace multiple tags on an existing document
 *
 * @param {number} document_id ID of the document you'd like to add a Tag
 * @param {string[]} tags array of tags to be added
 * @return {JSON} response about tag added.
 */
Client.prototype.replace_tags = async function (document_id, tags) {
    let endpoint_name = `/documents/${document_id}/`;
    let request_arguments = {"tags": tags};
    let response = await this._request("PUT", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Add multiple tags on an existing document
 *
 * @param {number} document_id ID of the document you'd like to add a Tag
 * @param {string[]} tags array of tags to be added
 * @return {JSON} response about tag added.
 */
Client.prototype.add_tags = async function (document_id, tags) {
    let endpoint_name = `/documents/${document_id}/tags/`;
    let request_arguments = {"tags": tags};
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Process any document and extract all the fields from it
 * @example
 * veryfi_client.process_any_document('file/path','blue_print')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {String} template_name name of the extraction templates.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document = async function (
    file_path,
    template_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {

    let endpoint_name = "/any-documents/";
    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    let request_arguments = {
        "file_name": file_name,
        "file_data": base64_encoded_string,
        "template_name": template_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Process any document and extract all the fields from it
 * @example
 * veryfi_client.process_any_document_url('file_url','blue_print')
 *
 * @memberof Client
 * @param {String} file_url url file to submit for data extraction
 * @param {String} template_name name of the extraction templates.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document_url = async function (
    file_url,
    template_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {

    let endpoint_name = "/any-documents/";
    let request_arguments = {
        "file_url": file_url,
        "template_name": template_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Get all any documents
 * @memberof Client
 * @param {number} page The page number. The response is capped to maximum of 50 results per page.
 * @param {number} page_size The number of Documents per page.
 * @returns {JSON} Object of previously processed any documents
 */
Client.prototype.get_any_documents = async function (
    page = 1,
    page_size = 50) {
    let endpoint_name = "/any-documents/";
    let request_arguments = {"page": page, "page_size": page_size};
    let documents = await this._request("GET", endpoint_name, request_arguments);
    if ("data" in documents) {
        documents = documents["data"];
    }
    return documents;
}

/**
 * Get a specific any document
 * @memberof Client
 * @param {number} document_id The unique identifier of the document.
 * @returns {JSON} Object of a previously processed blueprinted document.
 */
Client.prototype.get_any_document = async function (document_id) {
    let endpoint_name = `/any-documents/${document_id}/`;
    let request_arguments = {};
    let document = await this._request("GET", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Get a specific bank statement
 * @memberof Client
 * @param {number} document_id The unique identifier of the document.
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @returns {JSON} Object of a previously processed blueprinted document.
 */
Client.prototype.get_bank_statement = async function (
    document_id,
    bounding_boxes = false,
    confidence_details = false
) {
    let endpoint_name = `/bank-statements/${document_id}/`;
    let request_arguments = {
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details
    };
    let document = await this._request("GET", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Get all bank statements
 * @memberof Client
 * @param {number} page The page number. The response is capped to maximum of 50 results per page.
 * @param {number} page_size The number of Documents per page.
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @returns {JSON} Object of previously processed any documents
 */
Client.prototype.get_bank_statements = async function (
    page = 1,
    page_size = 50,
    bounding_boxes = false,
    confidence_details = false
) {
    let endpoint_name = `/bank-statements/`;
    let request_arguments = {
        "page": page,
        "page_size": page_size,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details
    };
    let document = await this._request("GET", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Process bank statement and extract all the fields from it
 * @example
 * veryfi_client.process_bank_statement('file_path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_bank_statement = async function (
    file_path,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {

    let endpoint_name = "/bank-statements/";
    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    let request_arguments = {
        "file_name": file_name,
        "file_data": base64_encoded_string,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}

/**
 * Process bank statement and extract all the fields from it
 * @example
 * veryfi_client.process_bank_statement_url('file_url')
 *
 * @memberof Client
 * @param {String} file_url url file to submit for data extraction
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_bank_statement_url = async function (
    file_url,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {

    let endpoint_name = "/bank-statements/";
    let request_arguments = {
        "file_url": file_url,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}


// Exports

module.exports = Client;
