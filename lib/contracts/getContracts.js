const Client = require('../client/constructor');
/**
 * Get contracts. https://docs.veryfi.com/api/contracts/get-contracts/
 *
 * @memberof Client
 * @param {number} page The page number. The response is capped to a maximum of 50 results per page.
 * @param {number} page_size The number of documents per page.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} List of documents
 */
Client.prototype.get_contracts = async function (
    page = 1,
    page_size = 50,
    {...kwargs} = {}
) {
    let endpoint_name = "/contracts/";
    let query = Object.assign({
        "page": page,
        "page_size": page_size,
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
