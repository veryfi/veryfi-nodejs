const Client = require('../client/constructor');
/**
 * Get Tls Certificates. https://docs.veryfi.com/api/get-tls-certificates/
 *
 * @memberof Client
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_tls_certificates = async function (
    {...kwargs} = {}
) {
    let endpoint_name = "/settings/tls-certificate/";
    let response = await this._request("GET", endpoint_name, {}, kwargs, false);
    return response['data'];
}
