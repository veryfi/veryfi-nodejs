const Client = require('../client/constructor');
/**
 * Checks if a Base64 string contains any of the predefined MIME types.
 *
 * @param {string} base64String - The Base64 encoded string with a MIME type prefix.
 * @returns {boolean} - Returns true if any predefined MIME type is found, false otherwise.
 */
Client.prototype.check_mime_type = function (base64String) {
    const mimeTypes = [
        'image/png',
        'image/jpeg',
        'application/pdf',
    ];
    return mimeTypes.some(mimeType => base64String.startsWith(`data:${mimeType};base64,`));
}
