const Client = require('../client/Client');
/**
 * Process a w9 document from an url. https://docs.veryfi.com/api/w9s/process-a-w-9/
 * @memberOf Client
 * @param {String} file_name The file name including the extension
 * @memberof Client
 * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file".
 * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files
 * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w9_document_from_url = async function (
    file_name,
    file_url,
    file_urls = null,
    delete_after_processing = false,
    max_pages_to_process = 1,
    {...kwargs} = {}
) {
    let endpoint_name = "/w9s/"
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
