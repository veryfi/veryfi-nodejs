const Client = require('../client/constructor');
/**
 * Retrieve client-keys list. https://docs.veryfi.com/api/settings/retrieve-client-keys-list/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_client_keys = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/client-keys/";
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
