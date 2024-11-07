const Client = require('../client/constructor');
/**
 * Process Business card and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
 *
 * @memberof Client
 * @param {stream.Readable} file file to submit for data extraction
 * @param {String} file_name The file name including the extension
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_business_card_from_stream = async function (
    file,
    file_name,
    {...kwargs} = {}
) {

    let endpoint_name = "/business-cards/";
    let request_arguments = {
        "file": file,
        "file_name": file_name,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, true);
    return document['data'];
}
