const Client = require('../client/constructor');
/**
 * Update a any document. https://docs.veryfi.com/api/anydocs/update-a-A-doc/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated resource
 */
Client.prototype.update_any_document = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/any-documents/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
