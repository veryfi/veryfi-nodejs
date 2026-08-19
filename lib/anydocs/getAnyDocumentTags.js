const Client = require('../client/constructor');
/**
 * Return all tags assigned to a specific any document. https://docs.veryfi.com/api/anydocs/get-A-doc-tags/
 *
 * @memberof Client
 * @param {number} document_id The unique identifier of the document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} List of tags assigned to a specific any document.
 */
Client.prototype.get_any_document_tags = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/any-documents/${document_id}/tags/`;
    let request_arguments = {};
    let response = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    return response['data'];
}
