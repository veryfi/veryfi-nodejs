const {createHmac} = require('crypto');
const axios = require('axios').default;
const path = require('path');
const fs = require('fs');
const VeryfiClientError = require('./errors');

/**
 * Create instance of a Client
 * @class
 * @param {string} client_id Your Veryfi client id
 * @param {string} client_secret Your Veryfi client secret
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
        base_url="https://api.veryfi.com/api/",
        api_version="v7",
        timeout=120,) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.username = username;
    this.api_key = api_key;
    this.base_url = base_url;
    this.timeout = timeout;
    this.api_version = api_version;
    this.headers = {};
    CATEGORIES = [
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
 * Prepares the headers needed for a request.
 * @private
 * @param {Boolean} has_files Are there any files to be submitted as binary
 * @return {Object} Dictionary with headers
 */
Client.prototype._get_headers = function (has_files=false){
    let final_headers = {
        "User-Agent": "Nodejs Veryfi-Nodejs/1.0.0",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Client-Id": this.client_id,
        "Authorization": `apikey ${this.username}:${this.api_key}`,
    };
    if (has_files){
        final_headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return final_headers;
}

/**
 * Get API Base URL with API Version
 * @private
 * @returns {string} Base URL to Veryfi API
 */
Client.prototype._get_url = function (){
    return this.base_url + this.api_version;
}

/**
 * Generate unique signature for payload params.
 * @private
 * @param {JSON} payload_params JSON params to be sent to API request
 * @param {Number} timestamp Unix Long timestamp
 * @returns {string} Unique signature generated using the client_secret and the payload
 */
Client.prototype._generate_signature = function (payload_params, timestamp){
    var payload = `timestamp:${timestamp}`;
    for (let i=0; i<Object.keys(payload_params).length; i++){
        let key = Object.keys(payload_params)[i];
        let value = payload_params[key];
        payload = `${payload},${key}:${value}`;
    }
    const secret_bytes = encodeURI(this.client_secret);
    const payload_bytes = encodeURI(payload);
    let hmac = createHmac('sha256', secret_bytes);
    hmac.update(payload_bytes);
    let tmp_signature = hmac.digest('sha256');
    var base64_signature = Buffer.from(tmp_signature).toString('base64');
    base64_signature = Buffer.from(base64_signature).toString('utf-8').trim();

    return base64_signature;
}

/**
 * Submit the HTTP request.
 * @private
 * @param {string} http_verb HTTP Method
 * @param {string} endpoint_name Endpoint name such as 'documents', 'users', etc.
 * @param {JSON} request_arguments JSON payload to send to Veryfi
 * @returns {JSON} A JSON of the response data.
 */
Client.prototype._request = async function (http_verb, endpoint_name, request_arguments, file_stream=null){
    let has_files = (Boolean(file_stream));
    let headers = this._get_headers(has_files=has_files);
    let api_url = `${this._get_url()}/partner${endpoint_name}`;

    if (this.client_secret){
        let timestamp = Date.now();
        let signature = this._generate_signature(request_arguments, timestamp=timestamp);
        headers = Object.assign(headers,{"X-Veryfi-Request-Timestamp": timestamp,
                                        "X-Veryfi-Request-Signature": signature});
    }

    if (has_files==false) {
        request_arguments = JSON.stringify(request_arguments);
    } else {
        Object.assign(headers,{...request_arguments.getHeaders()});
    }

    try {
        const response = await axios.request({
            method : http_verb,
            url : api_url,
            headers : headers,
            data : request_arguments,
            timeout : this.timeout * 1000
        });
        return response;
    } catch (response) {
        console.log(response);
        let Err = new VeryfiClientError(response,response['response']['data']);
        let err_msg = Err.from_response(response['response']);
        throw new Error(err_msg['status'],err_msg['error']);
    }
}


/**
 * Get JSON of documents
 * @memberof Client
 * @returns {JSON} JSON object of previously processed documents
 */
Client.prototype.get_documents = async function (){
    let endpoint_name = "/documents/";
    let request_arguments = {};
    let documents = await this._request("GET", endpoint_name, request_arguments);
    if ("data" in documents){
        return documents["data"];
    }
    return documents;
}

/**
 * Retrieve document by ID
 * @memberof Client
 * @param {Number} document_id ID of the document you'd like to retrieve
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
    if (!categories){
        categories = CATEGORIES;
    }
    let file_name = path.basename(file_path)
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    var base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    var request_arguments = {
        "file_name": file_name,
        "file_data": base64_encoded_string,
        "categories": categories,
        "auto_delete": delete_after_processing,
    }
    request_arguments = Object.assign(request_arguments,kwargs)
    let document = await this._request("POST", endpoint_name, request_arguments)
    return document['data'];
}

// /**
//  * Process document by sending it to Veryfi as a multipart form
//  * @memberof Client
//  * @param {string} file_path Path on disk to a file to submit for data extraction
//  * @param {Array} categories List of categories Veryfi can use to categorize the document
//  * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
//  * @param {Object} kwargs Additional request parameters
//  * @return {JSON} Data extracted from the document
//  * @function
//  */
// Client.prototype.process_document_file = async function (
//         file_path,
//         categories = null,
//         delete_after_processing = false,
//         {...kwargs} = {},
//     ) {
//     var _this = this; 
//     const endpoint_name = "/documents/"
//     if (!Boolean(categories)) {
//         categories = CATEGORIES;
//     }
    
//     const file_stream = fs.createReadStream(file_path);
//     // const size = fs.statSync(file_path)['size'] Move to headers

//     let file_name = path.basename(file_path)
//     var request_arguments = new FormData();
//     request_arguments.append("file_name", file_name);
//     request_arguments.append("categories", JSON.stringify(categories));
//     request_arguments.append("auto_delete", String(Number(delete_after_processing)));
//     // request_arguments.append("Content-Length", String(size)); Move to headers

//     for (key in kwargs) {
//         request_arguments.append(key, String(kwargs[key]));
//     }

//     request_arguments.append('file',file_stream);

//     let document = await _this._request("POST", endpoint_name, request_arguments, file_stream)
//     return document
// }

/**
 * Process document from url and extract all the fields from it.
 * @memberof Client
 * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
 * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
 * @param {Array} categories List of categories to use when categorizing the document
 * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {int} boost_mode Flag that tells Veryfi whether boost mode should be enabled. When set to 1, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is 0
 * @param {string} external_id Optional custom document identifier. Use this if you would like to assign your own ID to documents
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_document_url = async function (
        file_url = null,
        categories = null,
        delete_after_processing = false,
        boost_mode = 0,
        external_id = null,
        max_pages_to_process = null,
        file_urls = null,
        {...kwargs} = {},
    ) {
    let endpoint_name = "/documents/";
    var request_arguments = {
        "auto_delete": delete_after_processing,
        "boost_mode": boost_mode,
        "categories": categories,
        "external_id": external_id,
        "file_url": file_url,
        "file_urls": file_urls,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments,kwargs)
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}

/**
 * Delete document from Veryfi
 * 
 * @memberof Client
 * @param {Number} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_document = async function (document_id){
    
    let endpoint_name = `/documents/${document_id}/`;
    let request_arguments = {"id": document_id};
    await this._request("DELETE", endpoint_name, request_arguments);
}

/**
 * Update data for a previously processed document, including almost any field like `vendor`, `date`, `notes` and etc.
 * @example
 * veryfi_client.update_document(id, {date:"2021-01-01", notes:"look what I did"})
 * 
 * @memberof Client
 * @param {Number} document_id ID of the document you'd like to update
 * @param {Object} kwargs fields to update
 * @return {JSON} A document json with updated fields, if fields are writable. Otherwise a document with unchanged fields.
 */
Client.prototype.update_document = async function (document_id, {...kwargs} = {}){
    let endpoint_name = `/documents/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}

// Exports

module.exports = Client;
