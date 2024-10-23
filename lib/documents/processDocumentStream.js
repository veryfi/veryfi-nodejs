const Client = require('../client/Client');
/**
 * Process a document and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
 * @example
 * veryfi_client.process_document_stream('ReadStream',
 *                                'receipt.png',
 *                                ['Entertainment','Food'],
 *                                true,
 *                                {'extra': 'parameters'})
 *
 * @memberof Client
 * @param {ReadStream} file ReadStream of a file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {Array} categories List of categories Veryfi can use to categorize the document
 * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_document_stream = async function (
    file,
    file_name,
    delete_after_processing = false,
    {...kwargs} = {}
) {
    let endpoint_name = "/documents/";
    let request_arguments = {
        "file_name": file_name,
        "file": file,
        "auto_delete": delete_after_processing.toString(),
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, {}, true);
    return document['data'];
}
