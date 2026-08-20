const Client = require('../client/constructor');
/**
 * Update a W-2. https://docs.veryfi.com/api/w2s/update-a-w-2/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated resource
 */
Client.prototype.update_w2 = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/w2s/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
