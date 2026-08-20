const Client = require('../client/constructor');
/**
 * Get Bank Statement sets. https://docs.veryfi.com/api/get-bank-statement-sets/
 *
 * @memberof Client
 * @param {number} page Page number
 * @param {number} page_size Results per page
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_bank_statement_sets = async function (
    page = 1,
    page_size = 50,
    {...kwargs} = {}
) {
    let endpoint_name = "/bank-statements-set/";
    let query = Object.assign({
        "page": page,
        "page_size": page_size,
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
