const Client = require('../client/constructor');

/**
 * Prepares the headers needed for a request.
 * @private
 * @param {Boolean} has_files Are there any files to be submitted as binary
 * @return {Object} Dictionary with headers
 */
Client.prototype._get_headers = function (has_files = false) {
    let final_headers = {
        "User-Agent": "Node.js Veryfi-Nodejs/1.4.6",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Client-Id": this.client_id,
        "Authorization": `apikey ${this.username}:${this.api_key}`,
    };
    if (has_files) {
        final_headers["Content-Type"] = "multipart/form-data";
    }
    return final_headers;
}
