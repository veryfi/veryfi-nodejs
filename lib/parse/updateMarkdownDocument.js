const Client = require('../client/constructor');
/**
 * Update a Markdown Document. https://docs.veryfi.com/api/parse/update-a-markdown-document/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Fields to update
 * @returns {JSON} Updated resource
 */
Client.prototype.update_markdown_document = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/parse/${document_id}/`;
    let response = await this._request("PUT", endpoint_name, kwargs);
    return response['data'];
}
