const Client = require('../client/constructor');
/**
 * Delete a contract. https://docs.veryfi.com/api/contracts/delete-a-contract/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_contract = async function (document_id) {
    let endpoint_name = `/contracts/${document_id}/`;
    return this._request("DELETE", endpoint_name, {"id": document_id});
}
