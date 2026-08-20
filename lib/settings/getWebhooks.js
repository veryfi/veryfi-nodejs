const Client = require('../client/constructor');
/**
 * Get webhooks. https://docs.veryfi.com/api/settings/get-webhooks/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_webhooks = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/webhooks/";
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
