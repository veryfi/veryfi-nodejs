const Client = require('../client/constructor');
/**
 * Process a check with remittance from a file stream. https://docs.veryfi.com/api/checks/process-a-check-with-remittance/
 *
 * @memberof Client
 * @param {stream.Readable} file ReadStream of a file to submit
 * @param {String} file_name The file name including the extension
 * @param {boolean} bounding_boxes Return bounding_box and bounding_region for extracted fields.
 * @param {boolean} confidence_details Return score and ocr_score fields.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_check_with_remittance_from_stream = async function (
    file,
    file_name,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {
    let endpoint_name = "/check-with-document/";
    let request_arguments = {
        "file": file,
        "file_name": file_name,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, true);
    return response['data'];
}
