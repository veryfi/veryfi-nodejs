const Client = require('../client/constructor');
/**
 * Remove a device from blocklist. https://docs.veryfi.com/api/remove-a-device-from-blocklist/
 *
 * @memberof Client
 * @param {string} device_id ID of the resource
 * @returns {JSON} Delete response
 */
Client.prototype.remove_device_from_blocklist = async function (device_id) {
    let endpoint_name = `/fraud/blocklist/${device_id}/`;
    return this._request("DELETE", endpoint_name, {});
}
