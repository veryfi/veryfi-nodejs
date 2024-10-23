const Client = require('../client/Client');
/**
 * Process bank statement and extract all the fields from it. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_buffer Buffer of a file to submit for data extraction
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_bank_statement_from_buffer = async function (
    file_name,
    file_buffer,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {

    let endpoint_name = "/bank-statements/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_buffer,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}
