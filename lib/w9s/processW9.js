const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Upload a w9 document from a file path. https://docs.veryfi.com/api/w9s/process-a-w-9/
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
 * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_w9 = async function (
    file_path,
    bounding_boxes = false,
    confidence_details = false,
    {...kwargs} = {}
) {

    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    return this.process_w9_from_buffer(
        file_name,
        base64_encoded_string,
        bounding_boxes,
        confidence_details,
        kwargs
    );
}
