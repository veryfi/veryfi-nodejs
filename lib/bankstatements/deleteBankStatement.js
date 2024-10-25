const Client = require('../client/constructor');
/**
 * Delete a Bank Statement from Veryfi. https://docs.veryfi.com/api/bank-statements/delete-a-bank-statement/
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to delete
 */
Client.prototype.delete_bank_statement = async function (document_id) {
    let endpoint_name = `/bank-statements/${document_id}/`;
    let request_arguments = {"id": document_id};
    return this._request("DELETE", endpoint_name, request_arguments);
}
