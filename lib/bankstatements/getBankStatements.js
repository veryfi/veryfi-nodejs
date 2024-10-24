const Client = require('../client/Client');
/**
 * Get all bank statements. https://docs.veryfi.com/api/bank-statements/get-bank-statements/
 * @memberof Client
 * @param {number} page The page number. The response is capped to maximum of 50 results per page.
 * @param {number} page_size The number of Documents per page.
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @returns {JSON} Object of previously processed any documents
 */
Client.prototype.get_bank_statements = async function (
    page = 1,
    page_size = 50,
    bounding_boxes = false,
    confidence_details = false
) {
    let endpoint_name = `/bank-statements/`;
    let request_arguments = {
        "page": page,
        "page_size": page_size,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details
    };
    let document = await this._request("GET", endpoint_name, request_arguments);
    return document['data'];
}