const Client = require('../client/constructor');
/**
 * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
 * @example
 * veryfi_client.process_any_document('file/path','blue_print')
 *
 * @memberof Client
 * @param {stream.Readable} file ReadStream of a file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {String} blueprint_name The name of the extraction blueprints to use.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document_from_stream = async function (
    file,
    file_name,
    blueprint_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {

    let endpoint_name = "/any-documents/";
    let request_arguments = {
        "file_name": file_name,
        "file": file,
        "blueprint_name": blueprint_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, true);
    return document['data'];
}
