const Client = require('../client/constructor');
/**
 * Delete a Check from Veryfi. https://docs.veryfi.com/api/checks/delete-a-check/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_check = async function (document_id) {
    let endpoint_name = `/checks/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
