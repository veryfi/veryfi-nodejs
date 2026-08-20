const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Split and process a PDF. https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a PDF or zip to split
 * @param {Object} kwargs Additional request parameters (categories, tags, max_pages_to_process, external_id, package_path, bucket)
 * @returns {JSON} Split set response
 */
Client.prototype.split_document = async function (file_path, {...kwargs} = {}) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.split_document_from_stream(file, file_name, kwargs);
}
