const Client = require('../client/constructor');
/**
 * Process bank statement and extract all the fields from it. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/
 * @example
 * veryfi_client.process_bank_statement_from_url('file_url')
 *
 * @memberof Client
 * @param {String} file_url url file to submit for data extraction
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_bank_statement_from_url = async function (
    file_url,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {

    let endpoint_name = "/bank-statements/";
    let request_arguments = {
        "file_url": file_url,
        "bounding_boxes": bounding_boxes,
        "confidence_details": confidence_details,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, false);
    return document['data'];
}
