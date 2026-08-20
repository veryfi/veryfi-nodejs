const Client = require('../../client/constructor');
/**
 * Add tags to a any document. https://docs.veryfi.com/api/anydocs/add-tags-to-a-A-doc/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string[]} tags Tag names to add
 * @returns {JSON} Tags response
 */
Client.prototype.add_any_document_tags = async function (document_id, tags) {
    let endpoint_name = `/any-documents/${document_id}/tags/`;
    let request_arguments = {"tags": tags};
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
