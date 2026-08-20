const Client = require('../../client/constructor');
/**
 * Create a line item. https://docs.veryfi.com/api/receipts-invoices/create-a-line-item/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Line item fields (description, total, sku, quantity, etc.)
 * @returns {JSON} Created line item
 */
Client.prototype.create_line_item = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/line-items/`;
    let response = await this._request("POST", endpoint_name, kwargs);
    return response['data'];
}
