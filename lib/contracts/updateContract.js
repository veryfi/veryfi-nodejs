const Client = require('../client/constructor');
/**
 * Update a contract. https://docs.veryfi.com/api/contracts/update-a-contract/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated document
 */
Client.prototype.update_contract = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/contracts/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
