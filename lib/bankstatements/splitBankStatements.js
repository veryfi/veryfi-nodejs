const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Split and process multiple bank statements. https://docs.veryfi.com/api/split-and-process-multiple-bank-statements/
 * @example
 * veryfi_client.split_bank_statements('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.split_bank_statements = async function (
    file_path,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.split_bank_statements_from_stream(
        file,
        file_name,
        kwargs
    );
}
