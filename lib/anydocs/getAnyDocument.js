const Client = require('../client/Client');
/**
 * Get a specific any document. https://docs.veryfi.com/api/anydocs/get-a-%E2%88%80-doc/
 * @memberof Client
 * @param {number} document_id The unique identifier of the document.
 * @returns {JSON} Object of a previously processed blueprinted document.
 */
Client.prototype.get_any_document = async function (document_id) {
    let endpoint_name = `/any-documents/${document_id}/`;
    let request_arguments = {};
    let document = await this._request("GET", endpoint_name, request_arguments);
    return document['data'];
}
