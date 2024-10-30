const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process a W-8BEN-E document. https://docs.veryfi.com/api/w-8ben-e/process-a-w-8-ben-e/
 * @example
 * veryfi_client.process_w8bene('file_path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_w8bene = async function (
    file_path,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {

    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    const base64String = this.add_mime_type(base64_encoded_string, file_name);
    return this.process_w8bene_from_base64(
        file_name,
        base64String,
        bounding_boxes,
        confidence_details,
        kwargs
    );
}
