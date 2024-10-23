const Client = require('../client/Client');
/**
 * Get all any documents. https://docs.veryfi.com/api/anydocs/get-%E2%88%80-docs/
 * @memberof Client
 * @param {number} page The page number. The response is capped to maximum of 50 results per page.
 * @param {number} page_size The number of Documents per page.
 * @returns {JSON} Object of previously processed any documents
 */
Client.prototype.get_any_documents = async function (
    page = 1,
    page_size = 50) {
    let endpoint_name = "/any-documents/";
    let request_arguments = {"page": page, "page_size": page_size};
    let documents = await this._request("GET", endpoint_name, request_arguments);
    if ("data" in documents) {
        documents = documents["data"];
    }
    return documents;
}
