const Client = require('../../client/constructor');
/**
 * Get tags assigned to a bank statement. https://docs.veryfi.com/api/bank-statements/get-bank-statement-tags/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} List of tags
 */
Client.prototype.get_bank_statement_tags = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/bank-statements/${document_id}/tags/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
