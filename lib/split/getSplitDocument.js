const Client = require('../client/constructor');
/**
 * Veryfi's Get a Documents from PDF endpoint allows you to retrieve a collection of previously processed documents. https://docs.veryfi.com/api/receipts-invoices/get-documents-from-pdf/
 * @memberof Client
 * @param {string} document_id ID of the document you'd like to retrieve
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the Document
 */
Client.prototype.get_split_document = async function (document_id,  {...kwargs} = {}) {
    let endpoint_name = `/documents-set//${document_id}/`;
    let request_arguments = {"id": document_id};
    let document = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    return document['data'];
}
