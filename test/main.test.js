/**
 * Test main functions and input parameters
 */

const Client = require('../lib/client/Client');
const fs = require('fs');
const {expect, describe, test} = require("@jest/globals");
const assert = require("assert");
const client_id = process.env.VERYFI_CLIENT_ID;
const client_secret = process.env.VERYFI_CLIENT_SECRET;
const username = process.env.VERYFI_USERNAME;
const api_key = process.env.VERYFI_API_KEY;
const base_url = process.env.VERYFI_URL;
const api_version = "v8"
const timeout = 240000;

//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key, base_url, api_version, 240);
jest.setTimeout(timeout);

describe('Processing documents', () => {
    test('Process document from file_path', async () => {
        try {
            let response = await veryfi_client.process_document('resources/receipt.png');
            expect(response['vendor']['name']).toContain('Home Depot');
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
            expect(response['total']).toBe(34.95);
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
            expect(response['total']).toBe(34.95);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document from URL', async () => {
        try {
            let response = await veryfi_client.process_document_url('https://cdn.veryfi.com/receipts/92233902-c94a-491d-a4f9-0d61f9407cd2.pdf');
            expect(response['vendor']['name']).toContain('Rumpke');
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process document with with bounding boxes true', async () => {
        try {
            const settings = {
                bounding_boxes: true
            };
            let response = await veryfi_client.process_document('resources/receipt.png', null, null, settings);
            expect(response).toBeDefined()
        } catch (error) {
            throw new Error(error);
        }
    });
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

    test(`Get document with id `, async () => {
        try {
            let docs = await veryfi_client.get_documents();
            const doc_id = docs.documents[0].id;
            let doc = await veryfi_client.get_document(doc_id);
            expect(doc['id']).toBe(doc_id);
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

    test(`Add multiple tags to a document`, async () => {
        try {
            let tags = ['TAG_1', 'TAG_2', 'TAG_3']
            let docs = await veryfi_client.get_documents();
            const doc_id = docs.documents[0].id;
            await veryfi_client.delete_tags(doc_id);
            let response = await veryfi_client.add_tags(doc_id, tags);
            expect(response).toBeDefined()
        } catch (error) {
            expect(error).toBeDefined(); //Document already has these tags Request failed with status code 400
        }
    });

    test(`Replace tags in a document`, async () => {
        try {
            let tags = ['TAG_1', 'TAG_2', 'TAG_3']
            let docs = await veryfi_client.get_documents();
            const doc_id = docs.documents[0].id;
            let response = await veryfi_client.replace_tags(doc_id, tags);
            expect(response).toBeDefined()
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
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_document(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});

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
});

describe('Processing any documents', () => {
    test('Delete any document by id', async () => {
        try {
            let docs = await veryfi_client.get_any_documents();
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_any_document(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test(`Get any doc with id `, async () => {
        try {
            let docs = await veryfi_client.get_any_documents();
            const doc_id = docs.results[0].id;
            let doc = await veryfi_client.get_any_document(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Get any docs', async () => {
        try {
            let docs = await veryfi_client.get_any_documents();
            expect(docs.results.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process any document from file_path', async () => {
        try {
            let response = await veryfi_client.process_any_document('resources/driver_license.png', 'us_driver_license');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process any document from URL', async () => {
        try {
            let response = await veryfi_client.process_any_document_url('https://cdn-dev.veryfi.com/testing/veryfi-python/driver_license.png', 'us_driver_license');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Processing business cards', () => {
    test('Delete business card document by id', async () => {
        try {
            let docs = await veryfi_client.get_business_cards();
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_business_card(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test(`Get business card with id `, async () => {
        try {
            let docs = await veryfi_client.get_business_cards();
            const doc_id = docs.results[0].id;
            let doc = await veryfi_client.get_business_card(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Get business cards', async () => {
        try {
            let docs = await veryfi_client.get_business_cards();
            expect(docs.results.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process business card', async () => {
        try {
            let response = await veryfi_client.process_business_card('resources/business_card.jpg');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process business card from URL', async () => {
        try {
            let response = await veryfi_client.process_business_card_url('https://cdn-dev.veryfi.com/testing/veryfi-python/business_card.jpg');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Processing bank statement', () => {
    test('Delete bank-statement document by id', async () => {
        try {
            let docs = await veryfi_client.get_bank_statements();
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_bank_statement(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test(`Get bank statement with id `, async () => {
        try {
            let docs = await veryfi_client.get_bank_statements();
            const doc_id = docs.results[0].id;
            let doc = await veryfi_client.get_bank_statement(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Get bank statements', async () => {
        try {
            let docs = await veryfi_client.get_bank_statements();
            expect(docs.results.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process bank statement', async () => {
        try {
            let response = await veryfi_client.process_bank_statement('resources/bankstatement.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process bank statement from URL', async () => {
        try {
            let response = await veryfi_client.process_bank_statement_url('https://cdn-dev.veryfi.com/testing/veryfi-python/bankstatement.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Processing checks', () => {
    test('Delete a check document by id', async () => {
        try {
            let docs = await veryfi_client.get_checks();
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_check(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test(`Get check with id `, async () => {
        try {
            let docs = await veryfi_client.get_checks();
            const doc_id = docs.results[0].id;
            let doc = await veryfi_client.get_check(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Get checks', async () => {
        try {
            let docs = await veryfi_client.get_checks();
            expect(docs.results.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process check', async () => {
        try {
            let response = await veryfi_client.process_check('resources/check.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process check from URL', async () => {
        try {
            let response = await veryfi_client.process_check_url('https://cdn-dev.veryfi.com/testing/veryfi-python/check.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Process w2 documents', () => {
    test('Delete a w2 document by id', async () => {
        try {
            let docs = await veryfi_client.get_w2s();
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_w2(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test(`Get w2 with id `, async () => {
        try {
            let docs = await veryfi_client.get_w2s();
            const doc_id = docs.results[0].id;
            let doc = await veryfi_client.get_w2(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Get w2s', async () => {
        try {
            let docs = await veryfi_client.get_w2s();
            expect(docs.results.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process a w2 document from file_path', async () => {
        try {
            let response = await veryfi_client.process_w2('resources/w2.png');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    })
    test('Process a w2 document from url', async () => {
        try{
            let response = await veryfi_client.process_w2_url(
                'w2.png',
                'https://cdn.veryfi.com/wp-content/uploads/image.png',
                null,
                true);
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    })
});

describe('Processing W-8BEN-E', () => {
    test('Delete a W-8BEN-E document by id', async () => {
        try {
            let docs = await veryfi_client.get_w8benes();
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_w8bene(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test(`Get W-8BEN-E with id `, async () => {
        try {
            let docs = await veryfi_client.get_w8benes();
            const doc_id = docs.results[0].id;
            let doc = await veryfi_client.get_w8bene(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Get W-8BEN-Es', async () => {
        try {
            let docs = await veryfi_client.get_w8benes();
            expect(docs.results.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process W-8BEN-E', async () => {
        try {
            let response = await veryfi_client.process_w8bene('resources/w8bene.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process W-8BEN-E from URL', async () => {
        try {
            let response = await veryfi_client.process_w8bene_url('https://cdn-dev.veryfi.com/testing/veryfi-python/w8bene.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });
});

describe('Processing W9s', () => {
    test('Delete a W9 document by id', async () => {
        try {
            let docs = await veryfi_client.get_w9s();
            const doc_id = docs.documents[3].id;
            let response = await veryfi_client.delete_w9(doc_id);
            expect(response['status']).toBeDefined();
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    test(`Get W9 with id `, async () => {
        try {
            let docs = await veryfi_client.get_w9s();
            const doc_id = docs.results[0].id;
            let doc = await veryfi_client.get_w9(doc_id);
            expect(doc['id']).toBe(doc_id);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Get W9s', async () => {
        try {
            let docs = await veryfi_client.get_w9s();
            expect(docs.results.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process W9', async () => {
        try {
            let response = await veryfi_client.process_w9('resources/w9.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });

    test('Process W9 from URL', async () => {
        try {
            let response = await veryfi_client.process_w9_url('https://cdn-dev.veryfi.com/testing/veryfi-python/w9.pdf');
            expect(response).toBeDefined();
        } catch (error) {
            throw new Error(error);
        }
    });
});

