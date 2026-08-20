const Client = require('../client/constructor');
/**
 * Update a business card. https://docs.veryfi.com/api/business-cards/update-a-business-card/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated resource
 */
Client.prototype.update_business_card = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/business-cards/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
