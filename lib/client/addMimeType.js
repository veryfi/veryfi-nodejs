const path = require('path');
const Client = require("./constructor");

/**
 * Ensures a Base64 string includes a MIME type hint. If not present, uses the filename or filepath to add the appropriate MIME type.
 *
 * @param {string} base64String - The Base64 encoded string.
 * @param {string} filename or filePath - The filename or filepath to derive the MIME type if missing.
 * @returns {string} - Base64 string with MIME type prefix.
 */
Client.prototype.add_mime_type = function (base64String, filename) {
    const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.pdf': 'application/pdf',
    };
    if (base64String.startsWith('data:')) {
        return base64String;
    }
    const extension = path.extname(filename).toLowerCase();
    const mimeType = mimeTypes[extension] || 'application/octet-stream';
    return `data:${mimeType};base64,${base64String}`;
}
