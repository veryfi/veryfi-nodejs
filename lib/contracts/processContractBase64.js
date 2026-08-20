const Client = require('../client/constructor');
/**
 * Process a contract from a base64 string. https://docs.veryfi.com/api/contracts/process-a-contract/
 *
 * @memberof Client
 * @param {String} file_name The file name including the extension
 * @param {String} file_base64_string Base64-encoded file contents (raw or data URI)
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_contract_from_base64 = async function (
    file_name,
    file_base64_string,
    {...kwargs} = {}
) {
    let endpoint_name = "/contracts/";
    let request_arguments = {
        "file_name": file_name,
        "file_data": file_base64_string,
    };
    request_arguments = Object.assign(request_arguments, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments, null, false);
    return response['data'];
}
