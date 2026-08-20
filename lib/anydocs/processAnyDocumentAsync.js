const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process a any document asynchronously. https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/
 * @example
 * veryfi_client.process_any_document_async('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {String} blueprint_name The name of the extraction blueprints to use.
 * @param {number} max_pages_to_process The number of pages to process for the document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_any_document_async = async function (
    file_path,
    blueprint_name = null,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.process_any_document_async_from_stream(
        file,
        file_name,
        blueprint_name,
        max_pages_to_process,
        kwargs
    );
}
