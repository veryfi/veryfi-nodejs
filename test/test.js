/**
 * Test main functions and input parameters
 */

const Client = require('../../veryfi-nodejs');
const client_id = 'YOUR_ID';
const client_secret = 'YOUR_SECRET';
const username = 'YOUR_USERNAME';
const api_key = 'YOUR_KEY';
const doc_id =  'ID_TO_MODIFY';
const delete_id = 'ID_TO_DELETE';

var categories = ['Grocery', 'Utilities', 'Travel']
let veryfi_client;

beforeEach(() => {
    veryfi_client = new Client(client_id, client_secret, username, api_key);
});

describe('Managing documents', () => {
    test('Get documents', async () => {
        try {
            const docs = await veryfi_client.get_documents();
            console.log(docs)
        } catch (error) {
            console.log(error)
        }
    });

    test.skip(`Get document with id ${doc_id}`, async () => {
        try {
            const doc = await veryfi_client.get_document(doc_id);
        } catch (error) {
            console.log(error);
        }
    });
});

describe('Processing documents', () => {
    test('Upload invoice for processing', async () => {
        try {
            jest.setTimeout(8000);
            const request = await veryfi_client.process_document('test/reciept_1.png');
        } catch (error) {
            console.log(error);
        }
    });

    test('Process document from URL', async () => {
        try {
            jest.setTimeout(8000);
            const request = await veryfi_client.process_document_url('https://live.staticflickr.com/5441/17496936886_b32615002d_b.jpg');
        } catch (error) {
            console.log(error);
        }
    });
});

describe.skip('Editing Documents', () => {
    test('Delete a document by id', async () => {
        await veryfi_client.delete_document(delete_id);
    });

    test('Update a document\'s entries', async () => {
        const new_doc = await veryfi_client.update_document(doc_id,{"category":"Education"});
    });
})