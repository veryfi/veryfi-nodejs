const Client = require('../client/constructor');
/**
 * Classify and possibly extract data from a document from a base64 string. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_base64_string Base64-encoded file contents (raw or data URI)
 * @param {string[]} document_types Required. Types to classify the document into (preset types or blueprint names).
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.extract_document_from_base64 = async function (
    file_name,
    file_base64_string,
    document_types,
    {...kwargs} = {}
) {
    let endpoint_name = "/extract/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_base64_string,
        "document_types": document_types,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
