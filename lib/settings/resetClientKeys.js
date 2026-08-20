const Client = require('../client/constructor');
/**
 * Reset client-keys. https://docs.veryfi.com/api/settings/reset-client-keys/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.reset_client_keys = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/client-keys/reset/";
    let request_arguments = Object.assign({
    }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
