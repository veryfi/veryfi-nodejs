const Client = require('../../client/constructor');
/**
 * Delete all document line items. https://docs.veryfi.com/api/receipts-invoices/delete-all-document-line-items/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_document_line_items = async function (document_id) {
    let endpoint_name = `/documents/${document_id}/line-items/`;
    return this._request("DELETE", endpoint_name, {});
}
