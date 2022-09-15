/**
 * Test main functions and input parameters
 */
import {VeryfiDocument} from "../types/main";
const Client = require('../lib/main');
import {describe, expect, test, jest} from '@jest/globals';

const client_id = 'YOUR_ID';
const client_secret = 'YOUR_SECRET';
const username = 'YOUR_USERNAME';
const api_key = 'YOUR_API_KEY';

let doc_id =  'ID_TO_MODIFY';
let delete_id = 'ID_TO_DELETE';

let mockResponses = false; // Change to “false” if you want to test your personal credentials


//Creating the Client
let veryfi_client = new Client(client_id, client_secret, username, api_key);

describe('Processing documents', () => {
    jest.setTimeout(10000)
    test('Upload invoice for processing', async () => {
        try {
            let response: VeryfiDocument;
            if (mockResponses) {

            } else {
                response = await veryfi_client.process_document('tests/receipt.png');
            }
            expect(response['vendor']['name']).toBe('The Home Depot');
        } catch (error) {
            throw new Error(error);
        }
    });

})
