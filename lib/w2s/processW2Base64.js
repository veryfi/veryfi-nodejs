const Client = require('../client/constructor');
/**
 * Upload a w2 document from a buffer. https://docs.veryfi.com/api/w2s/process-a-w-2/
 * @memberOf Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
 * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w2_from_base64 = async function (
    file_name,
    file_base64_string,
    auto_delete = null,
    max_pages_to_process = null,
    {...kwargs} = {}
) {

    let endpoint_name = "/w2s/"
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_base64_string,
        "auto_delete": auto_delete,
        "max_pages_to_process": max_pages_to_process,
    }
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
