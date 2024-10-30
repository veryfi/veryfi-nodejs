/**
 * Create instance of a Client
 * @class
 * @param {string} client_id Your Veryfi client id
 * @param {string | undefined} client_secret Your Veryfi client secret
 * @param {string} username Your Veryfi username
 * @param {string} api_key Your Veryfi API key
 * @param {string} base_url
 * @param {Number} timeout
 */
function Client(
    client_id,
    client_secret,
    username,
    api_key,
    base_url = "https://api.veryfi.com/",
    timeout = 120) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.username = username;
    this.api_key = api_key;
    this.base_url = base_url;
    this.timeout = timeout;
    this.api_version = "v8";
}

module.exports = Client;
