const Client = require('../client/constructor');
/**
 * Get devices from blocklist. https://docs.veryfi.com/api/get-devices-from-blocklist/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_fraud_blocklist = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/fraud/blocklist/";
    let query = Object.assign({
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
