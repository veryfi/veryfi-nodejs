const Client = require('../client/Client');
/**
 * Get all w2 documents. https://docs.veryfi.com/api/w2s/get-w-2-s/
 * @memberOf Client
 * @param {int} page number, response is capped to maximum of 50 results per page.
 * @return {Array} An array of JSON with all w2 documents.
 */
Client.prototype.get_w2_documents = async function (page = null) {
    let endpoint_name = "/w2s/";
    let request_arguments = {};
    let params = {};
    if (page !== null) {
        params = {"page": page};
    }
    let response = await this._request("GET", endpoint_name, request_arguments, params);
    return response['data']['results'];
}
