const Client = require('../../client/constructor');
/**
 * Get document line items. https://docs.veryfi.com/api/receipts-invoices/get-document-line-items/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Line items
 */
Client.prototype.get_document_line_items = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/line-items/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
