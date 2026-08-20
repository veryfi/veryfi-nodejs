const Client = require('../../client/constructor');
/**
 * Unlink all tags from a W-8BEN-E. https://docs.veryfi.com/api/unlink-all-tags-from-a-w-8-ben-e/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_w8bene_tags = async function (document_id) {
    let endpoint_name = `/w-8ben-e/${document_id}/tags/`;
    return this._request("DELETE", endpoint_name, {});
}
