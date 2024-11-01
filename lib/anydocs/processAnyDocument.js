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
 * @param {String} blueprint_name The name of the extraction blueprints to use.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document = async function (
    file_path,
    blueprint_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {

    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);

    return this.process_any_document_from_stream(
        file,
        file_name,
        blueprint_name,
        max_pages_to_process,
        kwargs
    );
}
