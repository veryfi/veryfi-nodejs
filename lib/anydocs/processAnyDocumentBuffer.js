const Client = require('../client/constructor');
/**
 * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_buffer Buffer of a file to submit for data extraction
 * @param {String} template_name name of the extraction templates.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document_from_buffer = async function (
    file_name,
    file_buffer,
    template_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {
    let endpoint_name = "/any-documents/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_buffer,
        "template_name": template_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}
