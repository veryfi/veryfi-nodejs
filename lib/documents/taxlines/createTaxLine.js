const Client = require('../../client/constructor');
/**
 * Create a tax line. https://docs.veryfi.com/api/create-a-tax-line/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Tax line fields
 * @returns {JSON} Created tax line
 */
Client.prototype.create_tax_line = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/tax-lines/`;
    let response = await this._request("POST", endpoint_name, kwargs);
    return response['data'];
}
