const Client = require('../client/constructor');
/**
 * Convert a document to markdown from a file stream. https://docs.veryfi.com/api/parse/convert-a-document-to-markdown/
 *
 * @memberof Client
 * @param {stream.Readable} file ReadStream of a file to submit
 * @param {String} file_name The file name including the extension
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_markdown_document_from_stream = async function (
    file,
    file_name,
    {...kwargs} = {}
) {
    let endpoint_name = "/parse/";
    let request_arguments = {
        "file": file,
        "file_name": file_name,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, true);
    return response['data'];
}
