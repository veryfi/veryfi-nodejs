const Client = require('../client/constructor');
/**
 * Update api-key. https://docs.veryfi.com/api/settings/update-api-key/
 *
 * @memberof Client
 * @param {string} id Resource id
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.update_api_key = async function (
    id,
    {...kwargs} = {}
) {
    let endpoint_name = `/settings/api-keys/${id}/`;
    let request_arguments = Object.assign({
    }, kwargs);
    let response = await this._request("PUT", endpoint_name, request_arguments, null, false, { api_version: "v1" });
    return response['data'];
}
