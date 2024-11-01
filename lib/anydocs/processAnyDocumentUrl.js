const Client = require('../client/constructor');
/**
 * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
 * @example
 * veryfi_client.process_any_document_from_url('file_url','blue_print')
 *
 * @memberof Client
 * @param {String} file_url url file to submit for data extraction
 * @param {String} blueprint_name The name of the extraction blueprints to use.
 * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_any_document_from_url = async function (
    file_url,
    blueprint_name,
    max_pages_to_process = 20,
    {...kwargs} = {}
) {

    let endpoint_name = "/any-documents/";
    let request_arguments = {
        "file_url": file_url,
        "blueprint_name": blueprint_name,
        "max_pages_to_process": max_pages_to_process,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, false);
    return document['data'];
}
