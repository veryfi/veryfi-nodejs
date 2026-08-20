const Client = require('../client/constructor');
/**
 * Get ocr-counts. https://docs.veryfi.com/api/get-ocr-counts/
 *
 * @memberof Client
 * @param {string} ocr_type OCR type (pepsico_codes or pepsico_caps)
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.get_ocr_counts = async function (
    ocr_type = null,
    {...kwargs} = {}
) {
    let endpoint_name = "/ocr-counts/";
    let query = Object.assign({
        "ocr_type": ocr_type,
    }, kwargs);
    let response = await this._request("GET", endpoint_name, {}, query, false);
    return response['data'];
}
