const Client = require('../../client/constructor');
/**
 * Update a tax line. https://docs.veryfi.com/api/update-a-tax-line/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tax_line_id ID of the tax line
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated tax line
 */
Client.prototype.update_tax_line = async function (document_id, tax_line_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/tax-lines/${tax_line_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
