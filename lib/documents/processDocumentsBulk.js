const Client = require('../client/constructor');
/**
 * Bulk process multiple documents. https://docs.veryfi.com/api/receipts-invoices/bulk-process-multiple-documents/
 *
 * @memberof Client
 * @param {string[]} file_urls Required. Array of publicly accessible document URLs (1-100).
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} List of document ids being processed
 */
Client.prototype.process_documents_bulk = async function (file_urls, {...kwargs} = {}) {
    let endpoint_name = "/documents/bulk/";
    let request_arguments = Object.assign({ "file_urls": file_urls }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
