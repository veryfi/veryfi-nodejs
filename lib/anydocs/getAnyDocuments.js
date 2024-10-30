const Client = require('../client/constructor');
/**
 * Get all any documents. https://docs.veryfi.com/api/anydocs/get-%E2%88%80-docs/
 * @memberof Client
 * @param {number} page The page number. The response is capped to maximum of 50 results per page.
 * @param {number} page_size The number of Documents per page.
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Object of previously processed any documents
 */
Client.prototype.get_any_documents = async function (
    page = 1,
    page_size = 50,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}) {
    let endpoint_name = "/any-documents/";
    let request_arguments = {
        "page": page,
        "page_size": page_size,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details
    };
    let documents = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    if ("data" in documents) {
        documents = documents["data"];
    }
    return documents;
}
