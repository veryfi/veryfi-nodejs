const Client = require('../client/Client');
/**
 * Get a w2 document https://docs.veryfi.com/api/w2s/get-a-w-2/
 * @memberOf Client
 * @param {string} document_id ID of the document you'd like to retrieve
 * @returns {JSON} Data extracted from the Document
 */
Client.prototype.get_w2_document = async function (
    document_id,
) {
    let endpoint_name = `/w2s/${document_id}/`;
    let request_arguments = {"id": document_id};
    let response = await this._request("GET", endpoint_name, request_arguments);
    return response['data'];
}
