const Client = require('../client/constructor');
/**
 * Update a W-8BEN-E. https://docs.veryfi.com/api/w-8ben-e/update-a-w-8-ben-e/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated resource
 */
Client.prototype.update_w8bene = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/w-8ben-e/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
