const Client = require('../client/constructor');
/**
 * Get all w2 documents. https://docs.veryfi.com/api/w2s/get-w-2-s/
 * @memberOf Client
 * @param {Object} kwargs Additional request parameters
 * @return {Array} An array of JSON with all w2 documents.
 */
Client.prototype.get_w2s = async function ( {...kwargs} = {}) {
    let endpoint_name = "/w2s/";
    let request_arguments = {};
    let response = await this._request("GET", endpoint_name, request_arguments, kwargs, false);
    return response['data'];
}
