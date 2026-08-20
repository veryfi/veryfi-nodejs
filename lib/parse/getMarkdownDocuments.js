const Client = require('../client/constructor');
/**
 * Get Markdown Documents. https://docs.veryfi.com/api/parse/get-markdown-documents/
 *
 * @memberof Client
 * @param {number} page Page number
 * @param {number} page_size Results per page
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_markdown_documents = async function (
    page = 1,
    page_size = 50,
    {...kwargs} = {}
) {
    let endpoint_name = "/parse/";
    let query = Object.assign({
        "page": page,
        "page_size": page_size,
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
