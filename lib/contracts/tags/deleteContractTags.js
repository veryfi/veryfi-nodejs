const Client = require('../../client/constructor');
/**
 * Unlink all tags from a contract. https://docs.veryfi.com/api/unlink-all-tags-from-a-contract/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_contract_tags = async function (document_id) {
    let endpoint_name = `/contracts/${document_id}/tags/`;
    return this._request("DELETE", endpoint_name, {});
}
