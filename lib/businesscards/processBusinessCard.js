const Client = require('../client/constructor');
const path = require('path');
const fs = require('fs');
/**
 * Process Business card and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
 * @example
 * veryfi_client.process_business_card('file_path')
 *
 * @memberof Client
 * @param {String} file_path Path on disk to a file to submit for data extraction
 * @param {Object} kwargs Additional request parameters
 * @returns {JSON} Data extracted from the document
 */
Client.prototype.process_business_card = async function (
    file_path,
    {...kwargs} = {}
) {

    let file = fs.createReadStream(file_path);
    let file_name = path.basename(file_path);

    return this.process_business_card_from_stream(
        file,
        file_name,
        kwargs
    );
}
