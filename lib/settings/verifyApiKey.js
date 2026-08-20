const Client = require('../client/constructor');
/**
 * Verify the calling key. https://docs.veryfi.com/api/settings/verify-the-calling-key/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.verify_api_key = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/api-keys/verify/";
    let response = await this._request("GET", endpoint_name, {}, kwargs, false, { api_version: "v1" });
    return response['data'];
}
