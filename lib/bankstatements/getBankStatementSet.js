const Client = require('../client/constructor');
/**
 * Get a Bank Statement set. https://docs.veryfi.com/api/get-a-bank-statement-set/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_bank_statement_set = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/bank-statements-set/${document_id}/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
