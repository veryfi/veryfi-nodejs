const Client = require('../client/constructor');
/**
 * Get OpenAPI schema. https://docs.veryfi.com/api/get-open-api-schema/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_open_api_schema = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/documents/schema/";
    let query = Object.assign({
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
