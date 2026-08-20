const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process a bank statement asynchronously. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/
 * @example
 * veryfi_client.process_bank_statement_async('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {boolean} bounding_boxes Return bounding_box and bounding_region for extracted fields.
 * @param {boolean} confidence_details Return score and ocr_score fields.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_bank_statement_async = async function (
    file_path,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.process_bank_statement_async_from_stream(
        file,
        file_name,
        bounding_boxes,
        confidence_details,
        kwargs
    );
}
