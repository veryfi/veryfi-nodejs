const Client = require('../client/constructor');
/**
 * Process document from url and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
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
