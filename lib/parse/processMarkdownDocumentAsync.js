const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process a markdown document asynchronously. https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/
 * @example
 * veryfi_client.process_markdown_document_async('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_markdown_document_async = async function (
    file_path,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.process_markdown_document_async_from_stream(
        file,
        file_name,
        kwargs
    );
}
