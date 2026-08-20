const Client = require('../client/constructor');
/**
 * Get release notifications. https://docs.veryfi.com/api/get-release-notifications/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Release notifications
 */
Client.prototype.get_release_notifications = async function ({...kwargs} = {}) {
    let endpoint_name = "/release-notifications/";
    let response = await this._request("GET", endpoint_name, {}, kwargs, false, { api_version: "v1", skip_partner: true });
    return response['data'];
}
