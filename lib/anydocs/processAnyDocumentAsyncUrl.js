const Client = require('../client/constructor');
/**
 * Process a any document asynchronously from a URL. https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/
 *
 * @memberof Client
 * @param {string|null} file_url Required if file_urls isn't specified. Publicly accessible URL to a file.
 * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs.
 * @param {String} blueprint_name The name of the extraction blueprints to use.
 * @param {number} max_pages_to_process The number of pages to process for the document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_any_document_async_from_url = async function (
    file_url = null,
    file_urls = null,
    blueprint_name = null,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {
    let endpoint_name = "/any-documents/async/";
    let request_arguments = {
        "file_url": file_url,
        "file_urls": file_urls,
        "blueprint_name": blueprint_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
