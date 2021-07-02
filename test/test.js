/**
 * Test main functions and input parameters
 */

const Client = require('veryfi-sdk');
const client_id = 'your_client_id';
const client_secret = 'your_client_secret';
const username = 'your_username';
const api_key = 'your_api_key';

let doc_id = 0;
let delete_id = 0;

//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key);

describe('Processing documents', () => {
    test('Upload invoice for processing', async () => {
        const response = await veryfi_client.process_document('test/reciept_1.png');
        console.log(response);
    });

    test('Process document from URL', async () => {
        const response = await veryfi_client.process_document_url('https://live.staticflickr.com/5441/17496936886_b32615002d_b.jpg');
        console.log(response);
    });
});


describe('Managing documents', () => {
    test('Get documents', async () => {
        const docs = await veryfi_client.get_documents();
        console.log(docs);
    });

    test(`Get document with id`, async () => {
        const doc = await veryfi_client.get_document(doc_id);
        console.log(doc);
    });
});


describe('Editing Documents', () => {
    test('Update a document\'s entries', async () => {
        const response = await veryfi_client.update_document(doc_id, {category:"Education",date:"2019-10-10 00:00:00"});
        console.log(response);
    });

    test.only('Delete a document by id', async () => {
        await veryfi_client.delete_document(delete_id);
    });
})