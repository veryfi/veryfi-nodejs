const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Classify and possibly extract data from a document. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
 * @example
 * veryfi_client.extract_document('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {string[]} document_types Required. Types to classify the document into (preset types or blueprint names).
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.extract_document = async function (
    file_path,
    document_types,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.extract_document_from_stream(
        file,
        file_name,
        document_types,
        kwargs
    );
}
