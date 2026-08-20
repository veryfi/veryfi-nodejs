const Client = require('../client/constructor');
/**
 * Update a bank statement. https://docs.veryfi.com/api/bank-statements/update-a-bank-statement/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated resource
 */
Client.prototype.update_bank_statement = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/bank-statements/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
