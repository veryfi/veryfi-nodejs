const Client = require('../client/constructor');
/**
 * Veryfi's Get a Submitted PDF endpoint allows you to retrieve a collection of previously processed documents. https://docs.veryfi.com/api/receipts-invoices/get-submitted-pdf/
 * @memberof Client
 * @param {number} page The page number. The response is capped to maximum of 50 results per page.
 * @param {number} page_size The number of Documents per page.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} JSON object of previously processed documents
 */
Client.prototype.get_split_documents = async function (
    page = 1,
    page_size = 50,
    {...kwargs} = {}
) {
    let endpoint_name = "/documents-set/";
    let request_arguments = {
        "page": page,
        "page_size": page_size
    };
    let documents = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    if ("data" in documents) {
        documents = documents["data"];
    }
    return documents;
}
