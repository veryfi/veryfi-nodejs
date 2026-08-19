const Client = require('../client/constructor');
/**
 * Unlink a tag from a specific any document. https://docs.veryfi.com/api/anydocs/unlink-a-tag-from-a-A-doc/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to unlink the tag from
 * @param {string} tag_id ID of the tag you'd like to unlink
 * @return {JSON} response about the unlinked tag.
 */
Client.prototype.delete_any_document_tag = async function (document_id, tag_id) {
    let endpoint_name = `/any-documents/${document_id}/tags/${tag_id}/`;
    let request_arguments = {};
    return this._request("DELETE", endpoint_name, request_arguments);
}
