const Client = require('../client/constructor');
/**
 * Get Blueprints. https://docs.veryfi.com/api/get-blueprints/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_blueprints = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/blueprints/";
    let query = Object.assign({
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
