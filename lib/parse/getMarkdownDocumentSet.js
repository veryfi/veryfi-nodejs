const Client = require('../client/constructor');
/**
 * Get a Markdown Document Set. https://docs.veryfi.com/api/parse/get-a-markdown-document-set/
 *
 * @memberof Client
 * @param {string} document_id ID of the resource
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_markdown_document_set = async function (document_id, {...kwargs} = {}) {
    let endpoint_name = `/parse-set/${document_id}/`;
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
