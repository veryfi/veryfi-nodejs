const Client = require('../../client/constructor');
/**
 * Get tags assigned to a W-2. https://docs.veryfi.com/api/get-w-2-tags/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} List of tags
 */
Client.prototype.get_w2_tags = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/w2s/${document_id}/tags/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
