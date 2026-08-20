const Client = require('../../client/constructor');
/**
 * Add tags to a business card. https://docs.veryfi.com/api/add-tags-to-a-business-card/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string[]} tags Tag names to add
 * @returns {JSON} Tags response
 */
Client.prototype.add_business_card_tags = async function (document_id, tags) {
    let endpoint_name = `/business-cards/${document_id}/tags/`;
    let request_arguments = {"tags": tags};
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
