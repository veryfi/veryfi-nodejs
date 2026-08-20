const Client = require('../client/constructor');
/**
 * Process a bank statement asynchronously from a URL. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/
 *
 * @memberof Client
 * @param {string|null} file_url Required if file_urls isn't specified. Publicly accessible URL to a file.
 * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs.
 * @param {boolean} bounding_boxes Return bounding_box and bounding_region for extracted fields.
 * @param {boolean} confidence_details Return score and ocr_score fields.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_bank_statement_async_from_url = async function (
    file_url = null,
    file_urls = null,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {
    let endpoint_name = "/bank-statements/async/";
    let request_arguments = {
        "file_url": file_url,
        "file_urls": file_urls,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
