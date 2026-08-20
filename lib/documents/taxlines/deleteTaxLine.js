const Client = require('../../client/constructor');
/**
 * Delete a tax line. https://docs.veryfi.com/api/delete-a-tax-line/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tax_line_id ID of the tax line
 * @returns {JSON} Delete response
 */
Client.prototype.delete_tax_line = async function (document_id, tax_line_id) {
    let endpoint_name = `/documents/${document_id}/tax-lines/${tax_line_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
