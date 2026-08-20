const Client = require('../client/constructor');
/**
 * Available permissions. https://docs.veryfi.com/api/settings/available-permissions/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_api_key_permissions = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/api-keys/available-permissions/";
    let response = await this._request("GET", endpoint_name, {}, kwargs, false, { api_version: "v1" });
    return response['data'];
}
