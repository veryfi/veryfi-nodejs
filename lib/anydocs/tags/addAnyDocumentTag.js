const Client = require('../../client/constructor');
/**
 * Add a tag to a any document. https://docs.veryfi.com/api/anydocs/add-a-tag-to-a-A-doc/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tag Tag name to add
 * @returns {JSON} Tag response
 */
Client.prototype.add_any_document_tag = async function (document_id, tag) {
    let endpoint_name = `/any-documents/${document_id}/tags/`;
    let request_arguments = {"name": tag};
    let response = await this._request("PUT", endpoint_name, request_arguments);
    return response['data'];
}
