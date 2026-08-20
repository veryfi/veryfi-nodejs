const Client = require('../client/constructor');
/**
 * Rotate api-key. https://docs.veryfi.com/api/settings/rotate-api-key/
 *
 * @memberof Client
 * @param {string} id API key id
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Rotated API key
 */
Client.prototype.rotate_api_key = async function (id, {...kwargs} = {}) {
    let endpoint_name = `/settings/api-keys/${id}/rotate/`;
    let response = await this._request("POST", endpoint_name, kwargs, null, false, { api_version: "v1" });
    return response['data'];
}
