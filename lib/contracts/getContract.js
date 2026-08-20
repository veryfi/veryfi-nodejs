const Client = require('../client/constructor');
/**
 * Get a contract. https://docs.veryfi.com/api/contracts/get-a-contract/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Document data
 */
Client.prototype.get_contract = async function (
    document_id,
    {...kwargs} = {}
) {
    let endpoint_name = `/contracts/${document_id}/`;
    let query = Object.assign({}, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
