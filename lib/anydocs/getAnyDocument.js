const Client = require('../client/constructor');
/**
 * Get a specific any document. https://docs.veryfi.com/api/anydocs/get-a-%E2%88%80-doc/
 * @memberof Client
 * @param {number} document_id The unique identifier of the document.
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Object of a previously processed blueprinted document.
 */
Client.prototype.get_any_document = async function (document_id,
                                                    bounding_boxes = false,
                                                    confidence_details = false,
                                                    {...kwargs} = {}) {
    let endpoint_name = `/any-documents/${document_id}/`;
    let request_arguments = {
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details
    };
    let document = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    return document['data'];
}
