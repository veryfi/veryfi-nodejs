const Client = require('../client/constructor');
/**
 * Revoke api-key. https://docs.veryfi.com/api/settings/revoke-api-key/
 *
 * @memberof Client
 * @param {string} id Resource id
 * @returns {JSON} Delete response
 */
Client.prototype.revoke_api_key = async function (id) {
    let endpoint_name = `/settings/api-keys/${id}/`;
    return this._request("DELETE", endpoint_name, {}, {}, false, { api_version: "v1" });
}
