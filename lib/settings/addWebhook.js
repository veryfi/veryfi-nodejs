const Client = require('../client/constructor');
/**
 * Add a webhook. https://docs.veryfi.com/api/settings/add-a-webhook/
 *
 * @memberof Client
 * @param {*} url Request field
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.add_webhook = async function (
    url,
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/webhooks/";
    let request_arguments = Object.assign({
        "url": url,
    }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
