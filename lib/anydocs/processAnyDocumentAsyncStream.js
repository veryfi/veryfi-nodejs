const Client = require('../client/constructor');
/**
 * Process a any document asynchronously from a file stream. https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/
 *
 * @memberof Client
 * @param {stream.Readable} file ReadStream of a file to submit
 * @param {String} file_name The file name including the extension
 * @param {String} blueprint_name The name of the extraction blueprints to use.
 * @param {number} max_pages_to_process The number of pages to process for the document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_any_document_async_from_stream = async function (
    file,
    file_name,
    blueprint_name = null,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {
    let endpoint_name = "/any-documents/async/";
    let request_arguments = {
        "file": file,
        "file_name": file_name,
        "blueprint_name": blueprint_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, true);
    return response['data'];
}
