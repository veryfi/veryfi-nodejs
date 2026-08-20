const Client = require('../../client/constructor');
/**
 * Unlink all tags from a W-9. https://docs.veryfi.com/api/unlink-all-tags-from-a-w-9/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_w9_tags = async function (document_id) {
    let endpoint_name = `/w9s/${document_id}/tags/`;
    return this._request("DELETE", endpoint_name, {});
}
