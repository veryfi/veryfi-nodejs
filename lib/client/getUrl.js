const Client = require('../client/constructor');
/**
 * Get API Base URL with API Version
 * @private
 * @returns {string} Base URL to Veryfi API
 */
Client.prototype._get_url = function () {
    return this.base_url + "api/" + this.api_version;
}
