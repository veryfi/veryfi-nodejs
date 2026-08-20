const Client = require('../client/constructor');
/**
 * Remove a client-key. https://docs.veryfi.com/api/settings/remove-a-client-key/
 *
 * @memberof Client
 * @param {string} id Resource id
 * @returns {JSON} Delete response
 */
Client.prototype.delete_client_key = async function (id) {
    let endpoint_name = `/client-keys/${id}/`;
    return this._request("DELETE", endpoint_name, {});
}
