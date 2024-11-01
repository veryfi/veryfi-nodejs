const Client = require('../client/constructor');
/**
 * Process Check and extract all the fields from it. https://docs.veryfi.com/api/checks/process-a-check/
 * @example
 * veryfi_client.process_business_card_from_url('file_url')
 *
 * @memberof Client
 * @param {String} file_url url file to submit for data extraction
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_business_card_from_url = async function (
    file_url,
    {...kwargs} = {}
) {

    let endpoint_name = "/business-cards/";
    let request_arguments = {
        "file_url": file_url,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let document = await this._request("POST", endpoint_name, request_arguments, null, false);
    return document['data'];
}
