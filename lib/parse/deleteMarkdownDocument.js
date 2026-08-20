const Client = require('../client/constructor');
/**
 * Delete a Markdown Document. https://docs.veryfi.com/api/parse/delete-a-markdown-document/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @returns {JSON} Delete response
 */
Client.prototype.delete_markdown_document = async function (document_id) {
    let endpoint_name = `/parse/${document_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
