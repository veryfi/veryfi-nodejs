const Client = require('../client/constructor');
/**
 * Retrieve api-key. https://docs.veryfi.com/api/settings/retrieve-api-key/
 *
 * @memberof Client
 * @param {string} id Resource id
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_api_key = async function (
    id,
    {...kwargs} = {}
) {
    let endpoint_name = `/settings/api-keys/${id}/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false, { api_version: "v1" });
    return response['data'];
}
