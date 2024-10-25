const Client = require('../client/constructor');
/**
 * Delete document from Veryfi. https://docs.veryfi.com/api/receipts-invoices/delete-a-document/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_document = async function (document_id) {
    let endpoint_name = `/documents/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
