const Client = require('../../client/constructor');
/**
 * Get tags assigned to a business card. https://docs.veryfi.com/api/get-business-card-tags/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} List of tags
 */
Client.prototype.get_business_card_tags = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/business-cards/${document_id}/tags/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
