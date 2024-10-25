const Client = require('../../client/constructor');
/**
 * Add a new tag on an existing document. https://docs.veryfi.com/api/receipts-invoices/add-a-tag-to-a-document/
 *
 * @param {number} document_id ID of the document you'd like to add a Tag
 * @param {string} tag name to add
 * @return {JSON} response about tag added.
 */
Client.prototype.add_tag = async function (document_id, tag) {
    let endpoint_name = `/documents/${document_id}/tags/`;
    let request_arguments = {"name": tag};
    let response = await this._request("PUT", endpoint_name, request_arguments);
    return response['data'];
}
