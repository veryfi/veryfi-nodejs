const Client = require('../client/constructor');
/**
 * Classify document from url and extract all the fields from it. https://docs.veryfi.com/api/classify/classify-a-document/
 * @example
 * veryfi_client.classify_document_from_url('https://cdn.example.com/receipt.jpg')
 *
 * @memberof Client
 * @param {string|null} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
 * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.classify_document_from_url = async function (
    file_url = null,
    file_urls = null,
    {...kwargs} = {},
) {
    let endpoint_name = "/classify/";
    let request_arguments = {
        "file_url": file_url,
        "file_urls": file_urls,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
