const Client = require('../client/constructor');
/**
 * Process Business card and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_buffer Buffer of a file to submit for data extraction
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_business_card_from_buffer = async function (
    file_name,
    file_buffer,
    {...kwargs} = {}
) {
    const file_data = this.add_mime_type(file_buffer, file_name);
    let endpoint_name = "/business-cards/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_data,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments);
    return document['data'];
}
