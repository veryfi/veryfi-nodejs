const Client = require('../../client/constructor');
/**
 * Add a tag to a check. https://docs.veryfi.com/api/checks/add-a-tag-to-a-check/
 *
 * @memberof Client
 * @param {string} document_id ID of the document
 * @param {string} tag Tag name to add
 * @returns {JSON} Tag response
 */
Client.prototype.add_check_tag = async function (document_id, tag) {
    let endpoint_name = `/checks/${document_id}/tags/`;
    let request_arguments = {"name": tag};
    let response = await this._request("PUT", endpoint_name, request_arguments);
    return response['data'];
}
