/**
 * Test main functions and input parameters
 */
import {VeryfiDocument} from "../lib/types/main";
const Client = require('../lib/main');
import {describe, expect, test, jest} from '@jest/globals';
import fs from "fs";
import assert from "assert";

const client_id = process.env.VERYFI_CLIENT_ID;
const client_secret = process.env.VERYFI_CLIENT_SECRET;
const username = process.env.VERYFI_USERNAME;
const api_key = process.env.VERYFI_API_KEY;
const base_url = process.env.VERYFI_URL;
const api_version = "v8";
const timeout = Number(100000);

//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key, base_url, api_version);
jest.setTimeout(timeout);

describe('Processing documents', () => {
    test('Process document from file_path', async () => {
        try {
            let response: VeryfiDocument = await veryfi_client.process_document('resources/receipt.png');
            checkReceiptResponse(response);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from base64 string', async () => {
        try {
            const file_path = 'resources/receipt.png';
            const image_file = fs.readFileSync(file_path, { encoding: 'base64' });
            const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
            let response = await veryfi_client.process_document_base64string(
                base64_encoded_string,
                'receipt.png'
            );
            checkReceiptResponse(response);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from stream', async () => {
        try {
            const file_path = 'resources/receipt.png';
            const file = fs.createReadStream(file_path);
            let response = await veryfi_client.process_document_stream(
                file,
                'receipt.png'
            );
            checkReceiptResponse(response);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from URL', async () => {
        try {
            let response = await veryfi_client.process_document_url('https://cdn.veryfi.com/receipts/92233902-c94a-491d-a4f9-0d61f9407cd2.pdf');
            checkInvoiceResponse(response);
        } catch (error) {
            throw new Error(error);
        }
    });

    const checkReceiptResponse = (response: VeryfiDocument) => {
        expect(response.vendor.name).toBe('The Home Depot');
        expect(response.vendor.address).toBe('2250 Southgate Rd, Colorado Springs, CO 80906');
        expect(response.date).toBe('2018-10-17 09:03:00');
        expect(response.total).toBe(34.95);
        expect(response.tax).toBe(2.66);
        expect(response.subtotal).toBe(32.29);
        expect(response.document_type).toBe("receipt");
        expect(response.line_items.length).toBe(4);
        expect(response.payment.card_number).toBe('7373');
        expect(response.payment.type).toBe('visa');
    }

    const checkInvoiceResponse = (response: VeryfiDocument) => {
        expect(response.vendor.name).toBe('Rumpke');
        expect(response.vendor.address).toBe('3800 STRUBLE RD\nCINCINATTI OH 45251');
        expect(response.date).toBe('2020-08-04 00:00:00');
        expect(response.due_date).toBe('2020-08-19');
        expect(response.invoice_number).toBe('0998811');
        expect(response.total).toBe(329.74);
        expect(response.tax).toBe(23.47);
        expect(response.subtotal).toBe(329.74);
        expect(response.category).toBe('Utilities');
        expect(response.document_type).toBe("receipt");
        expect(response.line_items[0].total).toBe(116.32);
        expect(response.line_items[1].total).toBe(10);
        expect(response.line_items[2].total).toBe(29.89);
        expect(response.line_items[3].total).toBe(116.32);
        expect(response.line_items[4].total).toBe(5);
        expect(response.line_items[5].total).toBe(28.74);
    }
});

describe('Managing documents', () => {
    test('Get documents', async () => {
        try {
            let docs = await veryfi_client.get_documents();
            expect(docs.documents.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test(`Get document with id`, async () => {
        try {
            let docs = await veryfi_client.get_documents();
            const doc_id = docs.documents[0].id;
            let doc = await veryfi_client.get_document(doc_id);
            expect(doc.id).toBe(doc_id)
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Managing tags', () => {
    test(`Delete all tags of a document`, async () => {
        try {
            let docs = await veryfi_client.get_documents();
            const doc_id = docs.documents[0].id;
            let response = await veryfi_client.delete_tags(doc_id);
            expect(response).toBeDefined()
        } catch (error) {
            throw new Error(error);
        }
    });

    test(`Add tag to a document`, async () => {
        try {
            let tag_name = 'TEST_TAG'
            let docs = await veryfi_client.get_documents();
            const doc_id = docs.documents[0].id;
            await veryfi_client.delete_tags(doc_id);
            let tag = await veryfi_client.add_tag(doc_id, tag_name);
            expect(tag.name).toBe(tag_name)
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
            const doc_id = docs.documents[0].id;
            let response = await veryfi_client.update_document(doc_id, params);
            expect(response).toEqual(expect.objectContaining(params));
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Delete a document by id', async () => {
        try {
            let docs = await veryfi_client.get_documents();
            const doc_id = docs.documents[0].id;
            let response = await veryfi_client.delete_document(doc_id);
            expect(response['status']).toBe(200);
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Process w2 documents', () => {
    test('Process a w2 document from file_path', async () => {
        try {
            let doc = await veryfi_client.process_w2_document('resources/w2.png', true);
            expect(doc['control_number']).toBe('A1B2');
            expect(doc['employer_state_id']).toBe('1235');
        } catch (error) {
            throw new Error(error);
        }
    })
    test('Get w2 documents and get a w2 document by id', async () => {
        try {
            let docs = await veryfi_client.get_w2_documents();
            expect(docs.length).toBeGreaterThan(1);
            let doc_id = docs[0].id;
            let doc = await veryfi_client.get_w2_document(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    })
    test('Get w2 documents with page', async () => {
        try {
            let docs = await veryfi_client.get_w2_documents(1);
            expect(docs.length).toBeGreaterThan(1);
        } catch (error) {
            throw new Error(error)
        }
    })
    test('Process a w2 document from url', async () => {
        try{
            let doc = await veryfi_client.process_w2_document_from_url(
                'w2.png',
                'https://cdn.veryfi.com/wp-content/uploads/image.png',
                null,
                true
            );
            expect(doc['control_number']).toBe('A1B2');
            expect(doc['employer_state_id']).toBe('1235');
        } catch (error) {
            throw new Error(error);
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
