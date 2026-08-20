const Client = require('../client/constructor');
/**
 * Add devices to blocklist. https://docs.veryfi.com/api/add-devices-to-blocklist/
 *
 * @memberof Client
 * @param {string[]} device_ids Device IDs to block
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.add_devices_to_blocklist = async function (
    device_ids,
    {...kwargs} = {}
) {
    let endpoint_name = "/fraud/blocklist/";
    let request_arguments = Object.assign({
        "device_ids": device_ids,
    }, kwargs);
    let response = await this._request("POST", endpoint_name, request_arguments);
    return response['data'];
}
