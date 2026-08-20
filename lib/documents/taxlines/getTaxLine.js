const Client = require('../../client/constructor');
/**
 * Get a document tax line. https://docs.veryfi.com/api/returns-document-tax-line/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tax_line_id ID of the tax line
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Tax line
 */
Client.prototype.get_tax_line = async function (document_id, tax_line_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/tax-lines/${tax_line_id}/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
