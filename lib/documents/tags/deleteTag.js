const Client = require('../../client/constructor');
/**
 * Unlink a tag from a document. https://docs.veryfi.com/api/receipts-invoices/unlink-a-tag-from-a-document/
 *
 * @param {string} document_id ID of the document you'd like to unlink the tag from
 * @param {string} tag_id ID of the tag you'd like to unlink
 * @return {JSON} response about the unlinked tag.
 */
Client.prototype.delete_tag = async function (document_id, tag_id) {
    let endpoint_name = `/documents/${document_id}/tags/${tag_id}/`;
    let request_arguments = {};
    return this._request("DELETE", endpoint_name, request_arguments);
}
