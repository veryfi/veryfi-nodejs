const Client = require('../client/constructor');
/**
 * Delete a Tls Certificate. https://docs.veryfi.com/api/delete-a-tls-certificate/
 *
 * @memberof Client
 * @param {string} certificate_id Resource id
 * @returns {JSON} Delete response
 */
Client.prototype.delete_tls_certificate = async function (certificate_id) {
    let endpoint_name = `/settings/tls-certificate/${certificate_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
