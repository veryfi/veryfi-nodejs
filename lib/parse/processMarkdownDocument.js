const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Convert a document to markdown. https://docs.veryfi.com/api/parse/convert-a-document-to-markdown/
 * @example
 * veryfi_client.process_markdown_document('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_markdown_document = async function (
    file_path,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.process_markdown_document_from_stream(
        file,
        file_name,
        kwargs
    );
}
