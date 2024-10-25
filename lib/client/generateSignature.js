const Client = require('../client/constructor');
const {createHmac} = require('crypto');
/**
 * Generate unique signature for payload params.
 * @private
 * @param {{}} payload_params JSON params to be sent to API request
 * @param {Number} timestamp Unix Long timestamp
 * @returns {string} Unique signature generated using the client_secret and the payload
 */
Client.prototype._generate_signature = function (payload_params, timestamp) {
    let payload = `timestamp:${timestamp}`;
    for (let i = 0; i < Object.keys(payload_params).length; i++) {
        let key = Object.keys(payload_params)[i];
        let value = payload_params[key];
        payload = `${payload},${key}:${value}`;
    }
    const secret_bytes = encodeURI(this.client_secret);
    const payload_bytes = encodeURI(payload);
    let hmac = createHmac('sha256', secret_bytes);
    hmac.update(payload_bytes);
    let tmp_signature = hmac.digest();
    let base64_signature = Buffer.from(tmp_signature).toString('base64');
    base64_signature = Buffer.from(base64_signature).toString('utf-8').trim();

    return base64_signature;
}
