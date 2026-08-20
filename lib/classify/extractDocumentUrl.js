const Client = require('../client/constructor');
/**
 * Classify and possibly extract data from a document from a URL. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
 *
 * @memberof Client
 * @param {string|null} file_url Required if file_urls isn't specified. Publicly accessible URL to a file.
 * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs.
 * @param {string[]} document_types Required. Types to classify the document into (preset types or blueprint names).
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.extract_document_from_url = async function (
    file_url = null,
    file_urls = null,
    document_types,
    {...kwargs} = {}
) {
    let endpoint_name = "/extract/";
    let request_arguments = {
        "file_url": file_url,
        "file_urls": file_urls,
        "document_types": document_types,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
