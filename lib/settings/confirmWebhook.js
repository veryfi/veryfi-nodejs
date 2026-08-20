const Client = require('../client/constructor');
/**
 * Confirm a webhook. https://docs.veryfi.com/api/settings/confirm-a-webhook/
 *
 * @memberof Client
 * @param {*} url Request field
 * @param {*} secret Request field
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.confirm_webhook = async function (
    url,
    secret,
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/webhooks/confirm/";
    let request_arguments = Object.assign({
        "url": url,
        "secret": secret,
    }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
