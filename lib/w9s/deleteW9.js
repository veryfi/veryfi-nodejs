const Client = require('../client/constructor');
/**
 * Delete w9 document from Veryfi. https://docs.veryfi.com/api/w9s/delete-a-w-9/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_w9 = async function (document_id) {
    let endpoint_name = `/w9s/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
