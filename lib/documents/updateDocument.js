const Client = require('../client/constructor');
/**
 * https://docs.veryfi.com/api/receipts-invoices/update-a-document/
 * Update data for a previously processed document, including almost any field like `vendor`, `date`, `notes` and etc.
 * @example
 * veryfi_client.update_document(id, {date:"2021-01-01", notes:"look what I did"})
 *
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to update
 * @param {Object} kwargs fields to update
 * @return {JSON} A document json with updated fields, if fields are writable. Otherwise a document with unchanged fields.
 */
Client.prototype.update_document = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
