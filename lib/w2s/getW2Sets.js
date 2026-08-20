const Client = require('../client/constructor');
/**
 * Get W-2 sets. https://docs.veryfi.com/api/get-w-2-sets/
 *
 * @memberof Client
 * @param {number} page Page number
 * @param {number} page_size Results per page
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_w2_sets = async function (
    page = 1,
    page_size = 50,
    {...kwargs} = {}
) {
    let endpoint_name = "/w2s-set/";
    let query = Object.assign({
        "page": page,
        "page_size": page_size,
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
