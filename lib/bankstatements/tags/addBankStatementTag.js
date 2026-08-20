const Client = require('../../client/constructor');
/**
 * Add a tag to a bank statement. https://docs.veryfi.com/api/bank-statements/add-a-tag-to-a-bank-statement/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tag Tag name to add
 * @returns {JSON} Tag response
 */
Client.prototype.add_bank_statement_tag = async function (document_id, tag) {
    let endpoint_name = `/bank-statements/${document_id}/tags/`;
    let request_arguments = {"name": tag};
    let response = await this._request("PUT", endpoint_name, request_arguments);
    return response['data'];
}
