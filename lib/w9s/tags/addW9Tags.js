const Client = require('../../client/constructor');
/**
 * Add tags to a W-9. https://docs.veryfi.com/api/add-tags-to-a-w-9/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string[]} tags Tag names to add
 * @returns {JSON} Tags response
 */
Client.prototype.add_w9_tags = async function (document_id, tags) {
    let endpoint_name = `/w9s/${document_id}/tags/`;
    let request_arguments = {"tags": tags};
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
