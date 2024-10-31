const Client = require('../client/constructor');
/**
 * Process Business card and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_business_card_from_base64 = async function (
    file_name,
    file_base64_string,
    {...kwargs} = {}
) {
    
    let endpoint_name = "/business-cards/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_base64_string,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}
