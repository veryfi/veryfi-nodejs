const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process a contract. https://docs.veryfi.com/api/contracts/process-a-contract/
 * @example
 * veryfi_client.process_contract('file/path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} API response data
 */
Client.prototype.process_contract = async function (
    file_path,
    {...kwargs} = {}
) {
    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);
    return this.process_contract_from_stream(
        file,
        file_name,
        kwargs
    );
}
