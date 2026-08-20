const Client = require('../client/constructor');
/**
 * Update a check. https://docs.veryfi.com/api/checks/update-a-check/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated resource
 */
Client.prototype.update_check = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/checks/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
