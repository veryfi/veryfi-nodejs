const Client = require('../client/constructor');
/**
 * Delete a W-8BEN-E from Veryfi. https://docs.veryfi.com/api/w-8ben-e/delete-a-w-8-ben-e/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_w8bene = async function (document_id) {
    let endpoint_name = `/w-8ben-e/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
