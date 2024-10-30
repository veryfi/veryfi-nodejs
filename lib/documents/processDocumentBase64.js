const Client = require('../client/constructor');
/**
 * Process a document and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
 * @example
 * veryfi_client.process_document_base64string('base64_encoded_string',
 *                                'receipt.png',
 *                                ['Entertainment','Food'],
 *                                true,
 *                                {'extra': 'parameters'})
 *
 * @memberof Client
 * @param {String} base64_encoded_string Buffer string of a file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {Array} categories List of categories Veryfi can use to categorize the document
 * @param {Boolean} auto_delete Delete this document from Veryfi after data has been extracted
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_document_base64string = async function (
    base64_encoded_string,
    file_name,
    categories = null,
    auto_delete = false,
    {...kwargs} = {}
) {
    const base64String = this.add_mime_type(base64_encoded_string, file_name);
    let endpoint_name = "/documents/";
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
