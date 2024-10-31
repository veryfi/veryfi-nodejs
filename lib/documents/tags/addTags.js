const Client = require('../../client/constructor');
/**
 * Add multiple tags on an existing document. https://docs.veryfi.com/api/receipts-invoices/add-tags-to-a-document/
 *
 * @param {number} document_id ID of the document you'd like to add a Tag
 * @param {string[]} tags array of tags to be added
 * @return {JSON} response about tag added.
 */
Client.prototype.add_tags = async function (document_id, tags) {
    let endpoint_name = `/documents/${document_id}/tags/`;
    let request_arguments = {"tags": tags};
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
