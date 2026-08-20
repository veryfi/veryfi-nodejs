const Client = require('../client/constructor');
/**
 * Split and process a PDF from a file stream. https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/
 *
 * @memberof Client
 * @param {stream.Readable} file ReadStream of a PDF or zip to split
 * @param {String} file_name The file name including the extension
 * @param {Object} kwargs Additional request parameters (categories, tags, max_pages_to_process, external_id, package_path, bucket)
 * @returns {JSON} Split set response
 */
Client.prototype.split_document_from_stream = async function (file, file_name, {...kwargs} = {}) {
    let endpoint_name = "/documents-set/";
    let request_arguments = Object.assign({
        "file": file,
        "file_name": file_name
    }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, true);
    return response['data'];
}
