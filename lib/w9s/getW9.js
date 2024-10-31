const Client = require('../client/constructor');
/**
 * Get a w9 document https://docs.veryfi.com/api/w9s/get-a-w-9/
 * @memberof Client
 * @param {number} document_id The unique identifier of the document.
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Object of a previously processed blueprinted document.
 */
Client.prototype.get_w9 = async function (
    document_id,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {
    let endpoint_name = `/w9s/${document_id}/`;
    let request_arguments = {
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details
    };
    let document = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    return document['data'];
}
