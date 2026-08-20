const Client = require('../client/constructor');
/**
 * Get a W-2 set. https://docs.veryfi.com/api/get-a-w-2-set/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_w2_set = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/w2s-set/${document_id}/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
