const Client = require('../client/constructor');
/**
 * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
 * @param {String} blueprint_name The name of the extraction blueprints to use.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document_from_base64 = async function (
    file_name,
    file_base64_string,
    blueprint_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {

    let endpoint_name = "/any-documents/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_base64_string,
        "blueprint_name": blueprint_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, false);
    return document['data'];
}
