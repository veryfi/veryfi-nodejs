/**
 * Test main functions and input parameters
 */
import {VeryfiDocument} from "../types/main";
const Client = require('../lib/main');
import {describe, expect, test, jest} from '@jest/globals';

const client_id = process.env.VERYFI_CLIENT_ID;
const client_secret = process.env.VERYFI_CLIENT_SECRET;
const username = process.env.VERYFI_USERNAME;
const api_key = process.env.VERYFI_API_KEY;
const base_url = process.env.VERYFI_URL;
const api_version = "v8"


//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key, base_url, api_version);

describe('Processing documents', () => {
    jest.setTimeout(10000)
    test('Upload invoice for processing', async () => {
        try {
            let response: VeryfiDocument = await veryfi_client.process_document('tests/receipt.png');
            expect(response.vendor.name).toBe('The Home Depot');
        } catch (error) {
            throw new Error(error);
        }
    });
})
