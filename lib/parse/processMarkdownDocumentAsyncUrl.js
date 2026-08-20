const Client = require('../client/constructor');
/**
 * Process a markdown document asynchronously from a URL. https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/
 *
 * @memberof Client
 * @param {string|null} file_url Required if file_urls isn't specified. Publicly accessible URL to a file.
 * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_markdown_document_async_from_url = async function (
    file_url = null,
    file_urls = null,
    {...kwargs} = {}
) {
    let endpoint_name = "/parse/async/";
    let request_arguments = {
        "file_url": file_url,
        "file_urls": file_urls,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
