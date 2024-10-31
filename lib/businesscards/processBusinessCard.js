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

    let file_name = path.basename(file_path);
    const image_file = fs.readFileSync(file_path, {encoding: 'base64'});
    const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
    
    return this.process_business_card_from_base64(
        file_name,
        base64_encoded_string,
        kwargs
    );
}
