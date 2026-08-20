const Client = require('../../client/constructor');
/**
 * Unlink all tags from a business card. https://docs.veryfi.com/api/unlink-all-tags-from-a-business-card/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_business_card_tags = async function (document_id) {
    let endpoint_name = `/business-cards/${document_id}/tags/`;
    return this._request("DELETE", endpoint_name, {});
}
