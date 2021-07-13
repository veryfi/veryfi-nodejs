/**
 * Test main functions and input parameters
 */

const Client = require('../lib/main');
const client_id = 'YOUR_ID';
const client_secret = 'YOUR_SECRET';
const username = 'YOUR_USERNAME';
const api_key = 'YOUR_API_KEY';

const doc_id =  'ID_TO_MODIFY';
const delete_id = 'ID_TO_DELETE';


//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key);

describe('Processing documents', () => {
    jest.setTimeout(10000)
    test('Upload invoice for processing', async () => {
        try {
            const request = await veryfi_client.process_document('test/receipt.png');
            expect(request['vendor']['name']).toBe('The Home Depot');
        } catch (error) {
            console.log(error);
        }
    });

    test('Process document from URL', async () => {
        try {
            const request = await veryfi_client.process_document_url('https://cdn.veryfi.com/receipts/92233902-c94a-491d-a4f9-0d61f9407cd2.pdf');
            expect(request['vendor']['name']).toBe('Rumpke');
        } catch (error) {
            console.log(error);
        }
    });
});

describe('Managing documents', () => {
    test('Get documents', async () => {
        try {
            const docs = await veryfi_client.get_documents();
            expect(docs.length).toBeGreaterThan(0);

            expect(docs).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        'id': expect.any(Number),
                        'category': expect.any(String)
                    })
                ])
            );

        } catch (error) {
            console.log(error);
        }
    });

    test(`Get document with id ${doc_id}`, async () => {
        try {
            const doc = await veryfi_client.get_document(doc_id);
            expect(doc['id']).toBe(doc_id)
        } catch (error) {
            console.log(error);
        }
    });
});

describe('Editing Documents', () => {
    test('Update a document\'s entries', async () => {
        let params = {'category':'Education'};
        const new_doc = await veryfi_client.update_document(doc_id,params);
        expect(new_doc).toEqual(expect.objectContaining(params));
    });

    test('Delete a document by id', async () => {
        const docs_prev = await veryfi_client.get_documents();
        await veryfi_client.delete_document(delete_id);
        const docs_new = await veryfi_client.get_documents();
        expect(docs_new).toEqual(
            expect.arrayContaining([
                expect.not.objectContaining({
                    'id':`${delete_id}`
                })
            ])
        );

        expect(docs_prev.length).toBeGreaterThan(docs_new.length);
    });
})