const Client = require('../client/constructor');
/**
 * Retrieve document by ID. https://docs.veryfi.com/api/receipts-invoices/get-a-document/
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to retrieve
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the Document
 */
Client.prototype.get_document = async function (document_id,  {...kwargs} = {}) {
    let endpoint_name = `/documents/${document_id}/`;
    let request_arguments = {"id": document_id};
    let document = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    return document['data'];
}
