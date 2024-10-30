const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Upload a document from a file path https://docs.veryfi.com/api/w2s/process-a-w-2/
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w2 = async function (
    file_path,
    auto_delete = false,
    max_pages_to_process = 1,
    {...kwargs} = {}
) {
    const file_name = path.basename(file_path)
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'})
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8')
    const base64String = this.add_mime_type(base64_encoded_string, file_name);
    return this.process_w2_from_base64(
        file_name,
        base64String,
        auto_delete,
        max_pages_to_process,
        kwargs
    );
}
