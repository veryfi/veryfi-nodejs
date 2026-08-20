const Client = require('../../client/constructor');
/**
 * Update a line item. https://docs.veryfi.com/api/receipts-invoices/update-a-line-item/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} line_item_id ID of the line item
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated line item
 */
Client.prototype.update_line_item = async function (document_id, line_item_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/line-items/${line_item_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
