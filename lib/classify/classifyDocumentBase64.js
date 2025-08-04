const Client = require('../client/constructor');
/**
 * Classify a document and extract all the fields from it. https://docs.veryfi.com/api/classify/classify-a-document/
 * @example
 * veryfi_client.classify_document_from_base64('base64_encoded_string',
 *                                'receipt.png',
 *                                {'extra': 'parameters'})
 *
 * @memberof Client
 * @param {String} base64_encoded_string Buffer string of a file to submit for classify extraction
 * @param {String} file_name The file name including the extension
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.classify_document_from_base64 = async function (
    base64_encoded_string,
    file_name,
    {...kwargs} = {}
) {

    let endpoint_name = "/classify/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": base64_encoded_string,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, false);
    return document['data'];
}
