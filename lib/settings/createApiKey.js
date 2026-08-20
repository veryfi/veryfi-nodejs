const Client = require('../client/constructor');
/**
 * Create api-key. https://docs.veryfi.com/api/settings/create-api-key/
 *
 * @memberof Client
 * @param {*} name Request field
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.create_api_key = async function (
    name,
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/api-keys/";
    let request_arguments = Object.assign({
        "name": name,
    }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false, { api_version: "v1" });
    return response['data'];
}
