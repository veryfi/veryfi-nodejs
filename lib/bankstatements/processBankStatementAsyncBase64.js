const Client = require('../client/constructor');
/**
 * Process a bank statement asynchronously from a base64 string. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_base64_string Base64-encoded file contents (raw or data URI)
 * @param {boolean} bounding_boxes Return bounding_box and bounding_region for extracted fields.
 * @param {boolean} confidence_details Return score and ocr_score fields.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_bank_statement_async_from_base64 = async function (
    file_name,
    file_base64_string,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {
    let endpoint_name = "/bank-statements/async/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_base64_string,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
