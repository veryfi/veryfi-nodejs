const Client = require('../../client/constructor');
/**
 * Unlink a tag from a W-9. https://docs.veryfi.com/api/unlink-a-tag-from-a-w-9/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tag_id ID of the tag to unlink
 * @returns {JSON} Delete response
 */
Client.prototype.delete_w9_tag = async function (document_id, tag_id) {
    let endpoint_name = `/w9s/${document_id}/tags/${tag_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
