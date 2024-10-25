const Client = require('../client/constructor');
/**
 * Delete a Business Card from Veryfi. https://docs.veryfi.com/api/business-cards/delete-a-business-card/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_business_card = async function (document_id) {
    let endpoint_name = `/business-cards/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
