const Client = require('../client/constructor');
/**
 * Delete any document from Veryfi. https://docs.veryfi.com/api/anydocs/delete-a-%E2%88%80-doc/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_any_document = async function (document_id) {
    let endpoint_name = `/any-documents/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
