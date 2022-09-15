/**
 * Test main functions and input parameters
 */

const Client = require('../lib/main');
const fs = require('fs');
const client_id = 'YOUR_ID';
const client_secret = 'YOUR_SECRET';
const username = 'YOUR_USERNAME';
const api_key = 'YOUR_API_KEY';

let doc_id =  'ID_TO_MODIFY';
let delete_id = 'ID_TO_DELETE';

let mockResponses = true; // Change to “false” if you want to test your personal credentials


//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key);

describe('Processing documents', () => {
    jest.setTimeout(10000)
    test('Upload invoice for processing', async () => {
        try {
            let response;
            if (mockResponses) {
                const processDocumentJson = require('./processDocument.json');
                const veryfi_process_document = jest.fn();
                veryfi_process_document.mockReturnValue(processDocumentJson);
                response = veryfi_process_document();
            } else {
                response = await veryfi_client.process_document('test/receipt.png');
            }
            expect(response['vendor']['name']).toBe('The Home Depot');
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from buffer', async () => {
        try {
            let response;
            if (mockResponses) {
                const processDocumentJson = require('./processDocument.json');
                const process_document_buffer = jest.fn();
                process_document_buffer.mockReturnValue(processDocumentJson);
                response = process_document_buffer();
            } else {
                const file_path = 'test/receipt.png';
                const image_file = fs.readFileSync(file_path, { encoding: 'base64' });
                const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
                response = await veryfi_client.process_document_buffer(
                    base64_encoded_string,
                    'receipt.png'
                );
            }
            expect(response['vendor']['name']).toBe('The Home Depot');
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from URL', async () => {
        try {
            let response;
            if (mockResponses) {
                const processDocumentUrlJson = require('./processDocumentUrl.json');
                const veryfi_process_document_url = jest.fn();
                veryfi_process_document_url.mockReturnValue(processDocumentUrlJson);
                response = veryfi_process_document_url();
            } else {
                response = await veryfi_client.process_document_url('https://cdn.veryfi.com/receipts/92233902-c94a-491d-a4f9-0d61f9407cd2.pdf');
            }
            expect(response['vendor']['name']).toBe('Rumpke Waste & Recycling');
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Managing documents', () => {
    test('Get documents', async () => {
        try {
            let docs;
            if (mockResponses) {
                const getDocumentsJson = require('./getDocuments.json');
                const veryfi_get_documents = jest.fn();
                veryfi_get_documents.mockReturnValue(getDocumentsJson);
                docs = veryfi_get_documents();
            } else {
                docs = await veryfi_client.get_documents();
            }
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
            throw new Error(error);
        }
    });

    test(`Get document with id ${doc_id}`, async () => {
        try {
            let doc;
            if (mockResponses) {
                doc_id = 31727276;
                const getDocumentJson = require('./getDocument.json');
                const veryfi_get_document = jest.fn();
                veryfi_get_document.mockReturnValue(getDocumentJson);
                doc = veryfi_get_document();
            } else {
                doc = await veryfi_client.get_document(doc_id);
            }
            expect(doc['id']).toBe(doc_id)
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Editing Documents', () => {
    test('Update a document\'s entries', async () => {
        let params = {'notes':'Note updated'};
        try {
            let response;
            if (mockResponses) {
                const updateDocumentJson = require('./updateDocument.json');
                const veryfi_update_document = jest.fn();
                veryfi_update_document.mockReturnValue(updateDocumentJson);
                response = veryfi_update_document();
            } else {
                response = await veryfi_client.update_document(doc_id, params);
            }
            expect(response).toEqual(expect.objectContaining(params));
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Delete a document by id', async () => {
        try {
            let response;
            if (mockResponses) {
                const deleteDocumentJson = require('./deleteDocument.json');
                const veryfi_delete_document = jest.fn();
                veryfi_delete_document.mockReturnValue(deleteDocumentJson);
                response = veryfi_delete_document();
            } else {
                response = await veryfi_client.delete_document(delete_id);
            }
            expect(response['status']).toBe('ok')
        } catch (error) {
            throw new Error(error);
        }
    });
})
