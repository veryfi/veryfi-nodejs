const Client = require('../client/constructor');
/**
 * Process a Tls Certificate. https://docs.veryfi.com/api/process-a-tls-certificate/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_tls_certificate = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/tls-certificate/";
    let request_arguments = Object.assign({
    }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
