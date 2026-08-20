const Client = require('../../client/constructor');
/**
 * Unlink a tag from a check. https://docs.veryfi.com/api/checks/unlink-a-tag-from-a-check/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tag_id ID of the tag to unlink
 * @returns {JSON} Delete response
 */
Client.prototype.delete_check_tag = async function (document_id, tag_id) {
    let endpoint_name = `/checks/${document_id}/tags/${tag_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
