const Client = require('../client/constructor');
/**
 * Retrieve api-keys list. https://docs.veryfi.com/api/settings/retrieve-api-keys-list/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_api_keys = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/api-keys/";
    let response = await this._request("GET", endpoint_name, {}, kwargs, false, { api_version: "v1" });
    return response['data'];
}
