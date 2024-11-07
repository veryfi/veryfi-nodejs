const Client = require('../client/constructor');
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
 * @param {stream.Readable} file ReadStream of a file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {Boolean} auto_delete Delete this document from Veryfi after data has been extracted
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_document_from_stream = async function (
    file,
    file_name,
    auto_delete = false,
    {...kwargs} = {}
) {
    let endpoint_name = "/documents/";
    let request_arguments = {
        "file": file,
        "file_name": file_name,
        "auto_delete": auto_delete
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, true);
    return document['data'];
}
