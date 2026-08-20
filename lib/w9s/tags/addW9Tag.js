const Client = require('../../client/constructor');
/**
 * Add a tag to a W-9. https://docs.veryfi.com/api/add-a-tag-to-a-w-9/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tag Tag name to add
 * @returns {JSON} Tag response
 */
Client.prototype.add_w9_tag = async function (document_id, tag) {
    let endpoint_name = `/w9s/${document_id}/tags/`;
    let request_arguments = {"name": tag};
    let response = await this._request("PUT", endpoint_name, request_arguments);
    return response['data'];
}
