const Client = require('../client/constructor');
/**
 * Process a markdown document asynchronously from a base64 string. https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_base64_string Base64-encoded file contents (raw or data URI)
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_markdown_document_async_from_base64 = async function (
    file_name,
    file_base64_string,
    {...kwargs} = {}
) {
    let endpoint_name = "/parse/async/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_base64_string,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
