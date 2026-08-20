/**
 * Call-arg assertions for new and expanded Veryfi SDK methods.
 */
const Client = require('../lib/client/client.js');
const {expect, describe, test} = require("@jest/globals");

let client = new Client('client_id', 'client_secret', 'username', 'api_key', 'https://api.veryfi.com/', 120);

function mockRequest() {
    const fn = jest.fn().mockResolvedValue({
        status: 200,
        data: { id: 1, documents: [{ id: 1 }], results: [{ id: 1 }], tags: [{ name: 'urgent' }], name: 'urgent', vendor: { name: 'Home Depot' }, categories: ['Food'] }
    });
    client._request = fn;
    return fn;
}

describe('API coverage call contracts', () => {
    test("create_line_item POSTs fields", async () => {
        const mock = mockRequest();
        await client.create_line_item('11', {description: 'Milk', total: 3.5});
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/line-items/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"description":"Milk","total":3.5}));
    });

    test("get_document_line_items GETs collection", async () => {
        const mock = mockRequest();
        await client.get_document_line_items('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/line-items/");
    });

    test("delete_document_line_items DELETEs collection", async () => {
        const mock = mockRequest();
        await client.delete_document_line_items('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/line-items/");
    });

    test("get_line_item GETs one", async () => {
        const mock = mockRequest();
        await client.get_line_item('11', '22');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/line-items/22/");
    });

    test("update_line_item PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_line_item('11', '22', {total: 4});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/line-items/22/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"total":4}));
    });

    test("delete_line_item DELETEs one", async () => {
        const mock = mockRequest();
        await client.delete_line_item('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/line-items/22/");
    });

    test("get_document_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_document_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/tags/");
    });

    test("get_tax_lines GETs collection", async () => {
        const mock = mockRequest();
        await client.get_tax_lines('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/tax-lines/");
    });

    test("create_tax_line POSTs fields", async () => {
        const mock = mockRequest();
        await client.create_tax_line('11', {tax: 1.2});
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/tax-lines/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tax":1.2}));
    });

    test("get_tax_line GETs one", async () => {
        const mock = mockRequest();
        await client.get_tax_line('11', '33');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/tax-lines/33/");
    });

    test("update_tax_line PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_tax_line('11', '33', {tax: 2});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/tax-lines/33/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tax":2}));
    });

    test("delete_tax_line DELETEs one", async () => {
        const mock = mockRequest();
        await client.delete_tax_line('11', '33');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/tax-lines/33/");
    });

    test("process_documents_bulk requires file_urls", async () => {
        const mock = mockRequest();
        await client.process_documents_bulk(['https://example.com/a.pdf']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/documents/bulk/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_urls":["https://example.com/a.pdf"]}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("get_documents sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_documents(2, 10, true, true, {q: 'home'});
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents/");
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({"page":2,"page_size":10,"bounding_boxes":true,"confidence_details":true,"q":"home"}));
    });

    test("get_split_document uses a single slash before id", async () => {
        const mock = mockRequest();
        await client.get_split_document('99');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents-set/99/");
    });

    test("process_document forwards categories", async () => {
        const mock = mockRequest();
        await client.process_document('resources/receipt.png', ['Food'], false);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/documents/");
        expect(mock.mock.calls[0][4]).toBe(true);
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"categories":["Food"]}));
    });

    test("add_any_document_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_any_document_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/any-documents/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_any_document_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_any_document_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/any-documents/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("delete_any_document_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_any_document_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/any-documents/11/tags/");
    });

    test("update_any_document PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_any_document('11', {notes: 'x'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/any-documents/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"x"}));
    });

    test("get_blueprints GETs /blueprints/", async () => {
        const mock = mockRequest();
        await client.get_blueprints();
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/blueprints/");
    });

    test("process_any_document_async_from_url posts JSON to /any-documents/async/", async () => {
        const mock = mockRequest();
        await client.process_any_document_async_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/any-documents/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_any_document_async_from_base64 posts file_data to /any-documents/async/", async () => {
        const mock = mockRequest();
        await client.process_any_document_async_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/any-documents/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("add_bank_statement_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_bank_statement_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_bank_statement_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_bank_statement_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("get_bank_statement_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_bank_statement_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/11/tags/");
    });

    test("delete_bank_statement_tag DELETEs one tag", async () => {
        const mock = mockRequest();
        await client.delete_bank_statement_tag('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/11/tags/22/");
    });

    test("delete_bank_statement_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_bank_statement_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/11/tags/");
    });

    test("update_bank_statement PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_bank_statement('11', {notes: 'x'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"x"}));
    });

    test("process_bank_statement_async_from_url posts JSON to /bank-statements/async/", async () => {
        const mock = mockRequest();
        await client.process_bank_statement_async_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_bank_statement_async_from_base64 posts file_data to /bank-statements/async/", async () => {
        const mock = mockRequest();
        await client.process_bank_statement_async_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("split_bank_statements_from_url posts JSON to /bank-statements-set/", async () => {
        const mock = mockRequest();
        await client.split_bank_statements_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements-set/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("split_bank_statements_from_base64 posts file_data to /bank-statements-set/", async () => {
        const mock = mockRequest();
        await client.split_bank_statements_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements-set/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("get_bank_statement_set GETs by id", async () => {
        const mock = mockRequest();
        await client.get_bank_statement_set('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements-set/11/");
    });

    test("get_bank_statement_sets paginates via query", async () => {
        const mock = mockRequest();
        await client.get_bank_statement_sets(2, 10);
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements-set/");
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({"page":2,"page_size":10}));
    });

    test("add_business_card_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_business_card_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/business-cards/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_business_card_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_business_card_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/business-cards/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("get_business_card_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_business_card_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/business-cards/11/tags/");
    });

    test("delete_business_card_tag DELETEs one tag", async () => {
        const mock = mockRequest();
        await client.delete_business_card_tag('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/business-cards/11/tags/22/");
    });

    test("delete_business_card_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_business_card_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/business-cards/11/tags/");
    });

    test("update_business_card PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_business_card('11', {notes: 'x'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/business-cards/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"x"}));
    });

    test("add_check_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_check_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/checks/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_check_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_check_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/checks/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("get_check_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_check_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/checks/11/tags/");
    });

    test("delete_check_tag DELETEs one tag", async () => {
        const mock = mockRequest();
        await client.delete_check_tag('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/checks/11/tags/22/");
    });

    test("delete_check_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_check_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/checks/11/tags/");
    });

    test("update_check PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_check('11', {notes: 'x'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/checks/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"x"}));
    });

    test("process_check_async_from_url posts JSON to /checks/async/", async () => {
        const mock = mockRequest();
        await client.process_check_async_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/checks/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_check_async_from_base64 posts file_data to /checks/async/", async () => {
        const mock = mockRequest();
        await client.process_check_async_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/checks/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_check_with_remittance_from_url posts JSON to /check-with-document/", async () => {
        const mock = mockRequest();
        await client.process_check_with_remittance_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/check-with-document/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_check_with_remittance_from_base64 posts file_data to /check-with-document/", async () => {
        const mock = mockRequest();
        await client.process_check_with_remittance_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/check-with-document/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("add_w2_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_w2_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/w2s/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_w2_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_w2_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/w2s/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("get_w2_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_w2_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/w2s/11/tags/");
    });

    test("delete_w2_tag DELETEs one tag", async () => {
        const mock = mockRequest();
        await client.delete_w2_tag('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/w2s/11/tags/22/");
    });

    test("delete_w2_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_w2_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/w2s/11/tags/");
    });

    test("update_w2 PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_w2('11', {notes: 'x'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/w2s/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"x"}));
    });

    test("split_w2s_from_url posts JSON to /w2s-set/", async () => {
        const mock = mockRequest();
        await client.split_w2s_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/w2s-set/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("split_w2s_from_base64 posts file_data to /w2s-set/", async () => {
        const mock = mockRequest();
        await client.split_w2s_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/w2s-set/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("get_w2_set GETs by id", async () => {
        const mock = mockRequest();
        await client.get_w2_set('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/w2s-set/11/");
    });

    test("add_w8bene_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_w8bene_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/w-8ben-e/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_w8bene_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_w8bene_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/w-8ben-e/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("get_w8bene_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_w8bene_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/w-8ben-e/11/tags/");
    });

    test("delete_w8bene_tag DELETEs one tag", async () => {
        const mock = mockRequest();
        await client.delete_w8bene_tag('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/w-8ben-e/11/tags/22/");
    });

    test("delete_w8bene_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_w8bene_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/w-8ben-e/11/tags/");
    });

    test("update_w8bene PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_w8bene('11', {notes: 'x'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/w-8ben-e/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"x"}));
    });

    test("add_w9_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_w9_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/w9s/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_w9_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_w9_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/w9s/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("get_w9_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_w9_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/w9s/11/tags/");
    });

    test("delete_w9_tag DELETEs one tag", async () => {
        const mock = mockRequest();
        await client.delete_w9_tag('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/w9s/11/tags/22/");
    });

    test("delete_w9_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_w9_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/w9s/11/tags/");
    });

    test("update_w9 PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_w9('11', {notes: 'x'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/w9s/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"x"}));
    });

    test("process_contract_from_url posts JSON to /contracts/", async () => {
        const mock = mockRequest();
        await client.process_contract_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/contracts/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_contract_from_base64 posts file_data to /contracts/", async () => {
        const mock = mockRequest();
        await client.process_contract_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/contracts/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("get_contract sends flags as query", async () => {
        const mock = mockRequest();
        await client.get_contract('11', {q: 'x'});
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/");
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({"q":"x"}));
    });

    test("get_contracts sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_contracts(2, 10, {q: 'x'});
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/contracts/");
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({"page":2,"page_size":10,"q":"x"}));
    });

    test("update_contract PUTs fields", async () => {
        const mock = mockRequest();
        await client.update_contract('11', {notes: 'hi'});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"notes":"hi"}));
    });

    test("delete_contract DELETEs the document", async () => {
        const mock = mockRequest();
        await client.delete_contract('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/");
    });

    test("add_contract_tag PUTs {name}", async () => {
        const mock = mockRequest();
        await client.add_contract_tag('11', 'urgent');
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"urgent"}));
    });

    test("add_contract_tags POSTs {tags}", async () => {
        const mock = mockRequest();
        await client.add_contract_tags('11', ['a','b']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/tags/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"tags":["a","b"]}));
    });

    test("get_contract_tags GETs tags", async () => {
        const mock = mockRequest();
        await client.get_contract_tags('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/tags/");
    });

    test("delete_contract_tag DELETEs one tag", async () => {
        const mock = mockRequest();
        await client.delete_contract_tag('11', '22');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/tags/22/");
    });

    test("delete_contract_tags DELETEs all tags", async () => {
        const mock = mockRequest();
        await client.delete_contract_tags('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/contracts/11/tags/");
    });

    test("process_markdown_document_from_url posts JSON to /parse/", async () => {
        const mock = mockRequest();
        await client.process_markdown_document_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/parse/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_markdown_document_from_base64 posts file_data to /parse/", async () => {
        const mock = mockRequest();
        await client.process_markdown_document_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/parse/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_markdown_document_async_from_url posts JSON to /parse/async/", async () => {
        const mock = mockRequest();
        await client.process_markdown_document_async_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/parse/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_markdown_document_async_from_base64 posts file_data to /parse/async/", async () => {
        const mock = mockRequest();
        await client.process_markdown_document_async_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/parse/async/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_markdown_document_set_from_url posts JSON to /parse-set/", async () => {
        const mock = mockRequest();
        await client.process_markdown_document_set_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/parse-set/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("process_markdown_document_set_from_base64 posts file_data to /parse-set/", async () => {
        const mock = mockRequest();
        await client.process_markdown_document_set_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/parse-set/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("get_markdown_document GETs by id", async () => {
        const mock = mockRequest();
        await client.get_markdown_document('11');
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/parse/11/");
    });

    test("delete_markdown_document DELETEs", async () => {
        const mock = mockRequest();
        await client.delete_markdown_document('11');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/parse/11/");
    });

    test("update_markdown_document PUTs", async () => {
        const mock = mockRequest();
        await client.update_markdown_document('11', {tags: ['a']});
        expect(mock.mock.calls[0][0]).toBe("PUT");
        expect(mock.mock.calls[0][1]).toBe("/parse/11/");
    });

    test("extract_document_from_url posts JSON to /extract/", async () => {
        const mock = mockRequest();
        await client.extract_document_from_url('https://example.com/file.pdf', null);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/extract/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/file.pdf"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("extract_document_from_base64 posts file_data to /extract/", async () => {
        const mock = mockRequest();
        await client.extract_document_from_base64('file.pdf', 'abc123');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/extract/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_name":"file.pdf","file_data":"abc123"}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("get_fraud_blocklist GETs", async () => {
        const mock = mockRequest();
        await client.get_fraud_blocklist();
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/fraud/blocklist/");
    });

    test("add_devices_to_blocklist POSTs device_ids", async () => {
        const mock = mockRequest();
        await client.add_devices_to_blocklist(['dev-1']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/fraud/blocklist/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"device_ids":["dev-1"]}));
    });

    test("remove_device_from_blocklist DELETEs", async () => {
        const mock = mockRequest();
        await client.remove_device_from_blocklist('dev-1');
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/fraud/blocklist/dev-1/");
    });

    test("get_ocr_counts uses query params", async () => {
        const mock = mockRequest();
        await client.get_ocr_counts('pepsico_codes', {created_date__gte: '2026-01-01'});
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/ocr-counts/");
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({"ocr_type":"pepsico_codes","created_date__gte":"2026-01-01"}));
    });

    test("get_open_api_schema GETs documents schema", async () => {
        const mock = mockRequest();
        await client.get_open_api_schema();
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/documents/schema/");
    });

    test("get_release_notifications uses v1 without partner", async () => {
        const mock = mockRequest();
        await client.get_release_notifications();
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/release-notifications/");
        expect(mock.mock.calls[0][5]).toEqual(expect.objectContaining({"api_version":"v1","skip_partner":true}));
    });

    test("create_api_key posts name on v1", async () => {
        const mock = mockRequest();
        await client.create_api_key('ci-key', {full_access: true});
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/settings/api-keys/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"name":"ci-key","full_access":true}));
        expect(mock.mock.calls[0][5]).toEqual(expect.objectContaining({"api_version":"v1"}));
    });

    test("rotate_api_key posts rotate path", async () => {
        const mock = mockRequest();
        await client.rotate_api_key('9');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/settings/api-keys/9/rotate/");
        expect(mock.mock.calls[0][5]).toEqual(expect.objectContaining({"api_version":"v1"}));
    });

    test("add_webhook posts url", async () => {
        const mock = mockRequest();
        await client.add_webhook('https://example.com/hook');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/settings/webhooks/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"url":"https://example.com/hook"}));
    });

    test("confirm_webhook posts url and secret", async () => {
        const mock = mockRequest();
        await client.confirm_webhook('https://example.com/hook', 's3cret');
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/settings/webhooks/confirm/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"url":"https://example.com/hook","secret":"s3cret"}));
    });

    test("get_api_keys uses v1", async () => {
        const mock = mockRequest();
        await client.get_api_keys();
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/settings/api-keys/");
        expect(mock.mock.calls[0][5]).toEqual(expect.objectContaining({"api_version":"v1"}));
    });

    test("split_document_from_stream uses multipart", async () => {
        const mock = mockRequest();
        await client.split_document_from_stream(require('fs').createReadStream('resources/split.pdf'), 'split.pdf', {categories: ['Food']});
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/documents-set/");
        expect(mock.mock.calls[0][4]).toBe(true);
    });

    test("classify_document_from_url accepts document_types kwargs", async () => {
        const mock = mockRequest();
        await client.classify_document_from_url('https://example.com/a.pdf', null, {document_types: ['receipt']});
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/classify/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/a.pdf","file_urls":null,"document_types":["receipt"]}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("extract_document_from_url requires document_types", async () => {
        const mock = mockRequest();
        await client.extract_document_from_url('https://example.com/a.pdf', null, ['receipt', 'invoice']);
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/extract/");
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({"file_url":"https://example.com/a.pdf","document_types":["receipt","invoice"]}));
        expect(mock.mock.calls[0][4]).toBe(false);
    });

    test("get_bank_statements sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_bank_statements(2, 10, true, true, {q: "x"});
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/bank-statements/");
        expect(mock.mock.calls[0][2]).toEqual({});
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({page: 2, page_size: 10, bounding_boxes: true, confidence_details: true, q: "x"}));
    });

    test("get_any_documents sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_any_documents(2, 10, true, false, {blueprint_name: "us_passport"});
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/any-documents/");
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({page: 2, page_size: 10, bounding_boxes: true, confidence_details: false, blueprint_name: "us_passport"}));
    });

    test("get_checks sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_checks(3, 5, false, true);
        expect(mock.mock.calls[0][0]).toBe("GET");
        expect(mock.mock.calls[0][1]).toBe("/checks/");
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({page: 3, page_size: 5, bounding_boxes: false, confidence_details: true}));
    });

    test("get_business_cards sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_business_cards(1, 20, true, false);
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({page: 1, page_size: 20, bounding_boxes: true, confidence_details: false}));
    });

    test("get_w9s sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_w9s(1, 50, false, false, {q: "acme"});
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({page: 1, page_size: 50, q: "acme"}));
    });

    test("get_w8benes sends pagination as query", async () => {
        const mock = mockRequest();
        await client.get_w8benes(1, 50, true, true);
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({page: 1, page_size: 50, bounding_boxes: true, confidence_details: true}));
    });

    test("get_any_document sends flags as query", async () => {
        const mock = mockRequest();
        await client.get_any_document(11, true, true);
        expect(mock.mock.calls[0][1]).toBe("/any-documents/11/");
        expect(mock.mock.calls[0][2]).toEqual({});
        expect(mock.mock.calls[0][3]).toEqual(expect.objectContaining({bounding_boxes: true, confidence_details: true}));
    });

    test("delete_tag unlinks one receipt tag", async () => {
        const mock = mockRequest();
        await client.delete_tag("11", "22");
        expect(mock.mock.calls[0][0]).toBe("DELETE");
        expect(mock.mock.calls[0][1]).toBe("/documents/11/tags/22/");
    });

    test("classify_document_from_stream posts multipart", async () => {
        const mock = mockRequest();
        await client.classify_document_from_stream(require("fs").createReadStream("resources/receipt.png"), "receipt.png", {document_types: ["receipt"]});
        expect(mock.mock.calls[0][0]).toBe("POST");
        expect(mock.mock.calls[0][1]).toBe("/classify/");
        expect(mock.mock.calls[0][4]).toBe(true);
        expect(mock.mock.calls[0][2]).toEqual(expect.objectContaining({file_name: "receipt.png", document_types: ["receipt"]}));
    });

});
