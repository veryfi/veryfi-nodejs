const Client = require('../../client/constructor');
/**
 * Unlink all tags from a bank statement. https://docs.veryfi.com/api/bank-statements/unlink-all-tags-from-a-bank-statement/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @returns {JSON} Delete response
 */
Client.prototype.delete_bank_statement_tags = async function (document_id) {
    let endpoint_name = `/bank-statements/${document_id}/tags/`;
    return this._request("DELETE", endpoint_name, {});
}
