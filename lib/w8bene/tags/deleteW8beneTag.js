const Client = require('../../client/constructor');
/**
 * Unlink a tag from a W-8BEN-E. https://docs.veryfi.com/api/unlink-a-tag-from-a-w-8-ben-e/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tag_id ID of the tag to unlink
 * @returns {JSON} Delete response
 */
Client.prototype.delete_w8bene_tag = async function (document_id, tag_id) {
    let endpoint_name = `/w-8ben-e/${document_id}/tags/${tag_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
