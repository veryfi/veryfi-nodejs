const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
 * @example
 * veryfi_client.process_any_document('file/path','blue_print')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {String} template_name name of the extraction templates.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document = async function (
    file_path,
    template_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {
    let endpoint_name = "/any-documents/";
    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    
    return this.process_any_document_from_base64(
        file_name,
        base64_encoded_string,
        template_name,
        max_pages_to_process,
        kwargs
    );
}
