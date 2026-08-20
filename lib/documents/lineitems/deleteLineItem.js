const Client = require('../../client/constructor');
/**
 * Delete a line item. https://docs.veryfi.com/api/receipts-invoices/delete-a-line-item/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} line_item_id ID of the line item
 * @returns {JSON} Delete response
 */
Client.prototype.delete_line_item = async function (document_id, line_item_id) {
    let endpoint_name = `/documents/${document_id}/line-items/${line_item_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
