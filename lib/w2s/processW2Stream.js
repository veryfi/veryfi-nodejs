const Client = require('../client/constructor');
/**
 * Upload a w2 document from a buffer. https://docs.veryfi.com/api/w2s/process-a-w-2/
 * @memberOf Client
 * @param {stream.Readable} file file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
 * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
 * @param {Object} kwargs Additional request parameters
 * @return {JSON} Data extracted from the document.
 */
Client.prototype.process_w2_from_stream = async function (
    file,
    file_name,
    auto_delete = null,
    max_pages_to_process = null,
    {...kwargs} = {}
) {

    let endpoint_name = "/w2s/"
    let request_arguments = {
        "file": file,
        "file_name": file_name,
        "auto_delete": auto_delete,
        "max_pages_to_process": max_pages_to_process,
    }
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, true);
    return response['data'];
}
