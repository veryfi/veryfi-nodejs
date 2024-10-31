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

    let endpoint_name = "/documents/";
    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    let request_arguments = {
        "file_name": file_name,
        "file_data": base64_encoded_string,
        "categories": categories,
        "auto_delete": auto_delete,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}
module.exports = Client;
