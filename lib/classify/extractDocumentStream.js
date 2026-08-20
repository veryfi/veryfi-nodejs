const Client = require('../client/constructor');
/**
 * Classify and possibly extract data from a document from a file stream. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
 *
 * @memberof Client
 * @param {stream.Readable} file ReadStream of a file to submit
 * @param {String} file_name The file name including the extension
 * @param {string[]} document_types Required. Types to classify the document into (preset types or blueprint names).
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.extract_document_from_stream = async function (
    file,
    file_name,
    document_types,
    {...kwargs} = {}
) {
    let endpoint_name = "/extract/";
    let request_arguments = {
        "file": file,
        "file_name": file_name,
        "document_types": document_types,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, true);
    return response['data'];
}
