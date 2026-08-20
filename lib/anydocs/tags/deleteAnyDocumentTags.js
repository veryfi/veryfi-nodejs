const Client = require('../../client/constructor');
/**
 * Unlink all tags from a any document. https://docs.veryfi.com/api/anydocs/unlink-all-tags-from-a-A-doc/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_any_document_tags = async function (document_id) {
    let endpoint_name = `/any-documents/${document_id}/tags/`;
    return this._request("DELETE", endpoint_name, {});
}
