const Client = require('../../client/constructor');
/**
 * Get document tax lines. https://docs.veryfi.com/api/returns-a-list-of-document-tax-lines/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Tax lines
 */
Client.prototype.get_tax_lines = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/tax-lines/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
