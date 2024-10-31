const Client = require('../client/constructor');
/**
 * Delete w2 document from Veryfi https://docs.veryfi.com/api/w2s/delete-a-w-2/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_w2 = async function (document_id) {
    let endpoint_name = `/w2s/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
