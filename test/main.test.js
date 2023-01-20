/**
 * Test main functions and input parameters
 */

const Client = require('../lib/main');
const fs = require('fs');
const {expect, describe, test} = require("@jest/globals");
const assert = require("assert");
const client_id = process.env.VERYFI_CLIENT_ID;
const client_secret = process.env.VERYFI_CLIENT_SECRET;
const username = process.env.VERYFI_USERNAME;
const api_key = process.env.VERYFI_API_KEY;
const base_url = process.env.VERYFI_URL;
const api_version = "v7"
const timeout = 100000;

//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key, base_url, api_version);
jest.setTimeout(timeout)

describe('Processing documents', () => {
    test('Upload invoice for processing', async () => {
        try {
            let response = await veryfi_client.process_document('resources/receipt.png');
            expect(response['vendor']['name']).toBe('The Home Depot');
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from buffer', async () => {
        try {
                const file_path = 'resources/receipt.png';
                const image_file = fs.readFileSync(file_path, { encoding: 'base64' });
                const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
                let response = await veryfi_client.process_document_buffer(
                    base64_encoded_string,
                    'receipt.png'
                );
            expect(response['total']).toBe(34.95);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from URL', async () => {
        try {
            let response = await veryfi_client.process_document_url('https://cdn.veryfi.com/receipts/92233902-c94a-491d-a4f9-0d61f9407cd2.pdf');
            expect(response['vendor']['name']).toBe('Rumpke Of Ohio');
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Managing documents', () => {
    test('Get documents', async () => {
        try {
            let docs = await veryfi_client.get_documents();
            expect(docs.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test(`Get document with id `, async () => {
        try {
            let docs = await veryfi_client.get_documents();
            const doc_id = docs[0].id;
            let doc = await veryfi_client.get_document(doc_id);
            expect(doc['id']).toBe(doc_id)
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Editing Documents', () => {
    test('Update a document\'s entries', async () => {
        const randomString = (Math.random() + 1).toString(36).substring(7);
        let params = {'notes': randomString};
        try {
            let docs = await veryfi_client.get_documents();
            const doc_id = docs[0].id;
            let response = await veryfi_client.update_document(doc_id, params);
            expect(response).toEqual(expect.objectContaining(params));
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Delete a document by id', async () => {
        try {
            let docs = await veryfi_client.get_documents();
            const doc_id = docs[0].id;
            let response = await veryfi_client.delete_document(doc_id);
            expect(response['status']).toBe(200)
        } catch (error) {
            throw new Error(error);
        }
    });
})

describe('Process w2 documents', () => {
    test('Process a document from file_path', async () => {
        try {
            await veryfi_client.process_w2_document('resources/w2.png', true);
            assert(false)
        } catch (error) {
            assert(true)
        }
    })
    test('Get a documents and get a document by id', async () => {
        try {
            await veryfi_client.get_w2_documents()
            assert(false)
        } catch (error) {
            assert(true)
        }
    })
    test('Process a document from url', async () => {
        try{
            await veryfi_client.process_w2_document_from_url(
                'w2.png',
                'https://cdn.veryfi.com/wp-content/uploads/image.png',
                null,
                true
            );
            assert(false)
        } catch (error) {
            assert(true)
        }
    })
})

describe('Test bad credentials',  () => {
    test('Test bad credentials', async () => {
        let veryfi_wrong_client = new Client('client_id', 'client_secret', 'username', 'api_key', base_url, api_version)
        try {
            await veryfi_wrong_client.get_documents();
            assert(false)
        } catch (error) {
            assert(true)
        }
    })
})

