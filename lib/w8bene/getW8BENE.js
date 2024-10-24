const Client = require('../client/Client');
/**
 * Get a specific W-8BEN-E. https://docs.veryfi.com/api/w-8ben-e/get-a-w-8-ben-e/
 * @memberof Client
 * @param {number} document_id The unique identifier of the document.
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @returns {JSON} Object of a previously processed blueprinted document.
 */
Client.prototype.get_w8bene = async function (
    document_id,
    bounding_boxes = false,
    confidence_details = false
) {
    let endpoint_name = `/w-8ben-e/${document_id}/`;
    let request_arguments = {
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details
    };
    let document = await this._request("GET", endpoint_name, request_arguments);
    return document['data'];
}