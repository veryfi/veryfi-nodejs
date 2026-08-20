const Client = require('../../client/constructor');
/**
 * Unlink all tags from a check. https://docs.veryfi.com/api/checks/unlink-all-tags-from-a-check/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_check_tags = async function (document_id) {
    let endpoint_name = `/checks/${document_id}/tags/`;
    return this._request("DELETE", endpoint_name, {});
}
