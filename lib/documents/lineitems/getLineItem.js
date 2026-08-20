const Client = require('../../client/constructor');
/**
 * Get a line item. https://docs.veryfi.com/api/receipts-invoices/get-a-line-item/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} line_item_id ID of the line item
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Line item
 */
Client.prototype.get_line_item = async function (document_id, line_item_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/line-items/${line_item_id}/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
