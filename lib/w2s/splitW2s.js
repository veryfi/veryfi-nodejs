const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Split and process a PDF with multiple W-2s. https://docs.veryfi.com/api/split-and-process-a-pdf-with-multiple-w-2-s/
 * @example
 * veryfi_client.split_w2s('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.split_w2s = async function (
    file_path,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.split_w2s_from_stream(
        file,
        file_name,
        kwargs
    );
}
