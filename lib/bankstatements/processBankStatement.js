const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process bank statement and extract all the fields from it. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/
 * @example
 * veryfi_client.process_bank_statement('file_path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_bank_statement = async function (
    file_path,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {

    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);

    return this.process_bank_statement_from_stream(
        file,
        file_name,
        bounding_boxes,
        confidence_details,
        kwargs
    );
}
