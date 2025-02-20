const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process a document and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
 * @example
 * veryfi_client.process_document('file/path',
 *                                ['Entertainment','Food'],
 *                                true,
 *                                {"extra":"parameters"})
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {Array} categories List of categories Veryfi can use to categorize the document
 * @param {Boolean} auto_delete Delete this document from Veryfi after data has been extracted
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_document = async function (
    file_path,
    categories = null,
    auto_delete = false,
    {...kwargs} = {}
) {

    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);

    return this.process_document_from_stream(
        file,
        file_name,
        auto_delete,
        kwargs
    );
}
module.exports = Client;
