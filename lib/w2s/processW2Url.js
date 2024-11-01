const Client = require('../client/constructor');
/**
 * Process a w2 document from an url. https://docs.veryfi.com/api/w2s/process-a-w-2/
 * @memberOf Client
 * @param {String} file_name The file name including the extension
 * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
 * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
 * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w2_from_url = async function (
    file_name,
    file_url,
    file_urls = null,
    auto_delete = false,
    max_pages_to_process = 1,
    {...kwargs} = {}
) {
    let endpoint_name = "/w2s/"
    let request_arguments = {
        "file_name": file_name,
        "auto_delete": auto_delete,
        "file_url": file_url,
        "file_urls": file_urls,
        "max_pages_to_process": max_pages_to_process
    }
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
