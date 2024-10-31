const Client = require('../../client/constructor');
/**
 * Delete all the tags on an existing document. https://docs.veryfi.com/api/receipts-invoices/unlink-all-tags-from-a-document/
 *
 * @param {number} document_id ID of the document you'd like to delete tags
 * @return {JSON} response about deleted tags.
 */
Client.prototype.delete_tags = async function (document_id) {
    let endpoint_name = `/documents/${document_id}/tags/`;
    let request_arguments = {};
    return this._request("DELETE", endpoint_name, request_arguments);
}
