const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Classify a document. https://docs.veryfi.com/api/classify/classify-a-document/
 * @example
 * veryfi_client.classify_document('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.classify_document = async function (
    file_path,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.classify_document_from_stream(
        file,
        file_name,
        kwargs
    );
}
