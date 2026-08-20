# Veryfi Node.js SDK API Coverage Analysis

**SDK:** `@veryfi/veryfi-sdk` 1.4.8 (`veryfi/veryfi-nodejs`)
**Docs source of truth:** [https://docs.veryfi.com/](https://docs.veryfi.com/)
**Audit date:** 2026-08-20 (implementation update 2026-08-20)
**Scope:** public REST operations only (Lens, getting-started, and conceptual fraud guides are excluded)

This document maps every currently documented public Veryfi API operation to this Node.js SDK. Updated after implementing previously MISSING and PARTIAL operations.

## Methodology

1. Enumerated operations from [docs.veryfi.com/sitemap.xml](https://docs.veryfi.com/sitemap.xml) (151 REST operation pages). [llms.txt](https://docs.veryfi.com/llms.txt) is incomplete and was not used as the catalog.
2. Opened each operation page and recorded HTTP method, route, path/query/body parameters, encoding, pagination, and async behavior.
3. Inspected every public method under `lib/` plus `lib/types/Client.ts` and tests in `test/main.test.js` / `tests/main.test.ts`.
4. Matched operations by **HTTP method + normalized route** (trailing slashes ignored; `:document_id` equals the path id). Similarly named helpers were not treated as coverage by themselves.

### Classification

| Label | Meaning |
|---|---|
| **IMPLEMENTED** | SDK calls the documented method+route, and currently documented request parameters can be sent in the correct location (named args or kwargs merged into that location). |
| **PARTIAL** | The endpoint exists, but documented parameters, encodings, pagination, async routes, or the generated path are incomplete or incorrect. |
| **MISSING** | No public SDK method exposes the operation. |
| **UNCERTAIN** | Coverage cannot be proven from the repo and documentation. |

Kwargs that `Object.assign` into the JSON/multipart **body** count as supporting extra **body** fields. Kwargs passed as `_request`'s 4th argument count as **query** params. First-class list pagination that is placed in the JSON body instead of the query string is **PARTIAL**.

Fully implemented in the totals means both Endpoint Coverage and Parameter Coverage are IMPLEMENTED.

## Totals

| Metric | Count |
|---|---|
| Total documented API operations | **151** |
| Fully implemented | **151** |
| Partially implemented | **0** |
| Missing | **0** |
| Uncertain | **0** |
| SDK-only / convenience methods (not extra undocumented endpoints) | **90+** |

Coverage by product:

| Product | Ops | Fully implemented | Partial | Missing |
|---|---|---|---|---|
| Receipts & Invoices | 25 | 25 | 0 | 0 |
| AnyDocs (∀Docs) | 12 | 12 | 0 | 0 |
| Bank Statements | 14 | 14 | 0 | 0 |
| Business Cards | 10 | 10 | 0 | 0 |
| Checks | 12 | 12 | 0 | 0 |
| Contracts | 10 | 10 | 0 | 0 |
| W-2s | 13 | 13 | 0 | 0 |
| W-8BEN-E | 10 | 10 | 0 | 0 |
| W-9s | 10 | 10 | 0 | 0 |
| Parse Documents | 9 | 9 | 0 | 0 |
| Classification | 2 | 2 | 0 | 0 |
| Fraud / Device Blocklist | 3 | 3 | 0 | 0 |
| Platform | 3 | 3 | 0 | 0 |
| Settings | 18 | 18 | 0 | 0 |
| **Total** | **151** | **151** | **0** | **0** |

## Cross-cutting findings

### Authentication

Documented globally at [Authentication](https://docs.veryfi.com/api/getting-started/authentication/):

- Required `CLIENT-ID` header (SDK sends `Client-Id`)
- `Authorization: Bearer <key>` (recommended) or `apikey USERNAME:API_KEY`
- Optional `X-Veryfi-Request-Signature` + `X-Veryfi-Request-Timestamp`

The SDK implements Standard API keys (`apikey username:api_key`) plus HMAC signatures when `client_secret` is set. It does **not** expose Bearer-token auth. Default base URL is `https://api.veryfi.com/`, API version is hardcoded `v8`.

### HTTP client behavior (`lib/client/request.js`)

- Process uploads: JSON (`file_data` / `file_url`) and multipart (`file` stream) are both implemented.
- GET list/get-one helpers send documented pagination and flag fields as **query parameters**.
- DELETE/GET-by-id helpers often send an undocumented `{id: document_id}` JSON body.
- Return values are inconsistent: processors usually return `axiosResponse.data.data`; some lists return `axiosResponse.data`; deletes return the full axios response. Callers cannot rely on a single shape.
- `VeryfiExtraArgs` is typed as `Record<..., string | number | boolean>`, so nested objects (`device_data`, `vendor`, `line_items`) are rejected by TypeScript even though they work at runtime.

### Incorrect path

`get_split_document` uses `/documents-set/${document_id}/`.

### Missing product surfaces

Previously missing product surfaces are now implemented:

- Contracts
- Parse / Markdown (including `/parse/async` and `/parse-set`)
- Settings (v1 API keys, v8 client keys, TLS certs, webhooks)
- Fraud device blocklist
- Platform helpers (OCR counts, OpenAPI schema, v1 release notifications)
- Receipt line-item CRUD and tax-line CRUD
- Dedicated async routes (`/checks/async`, `/bank-statements/async`, `/any-documents/async`, `/parse/async`)
- Check remittance (`POST /check-with-document`)
- Split-set APIs for W-2s and bank statements (`/w2s-set`, `/bank-statements-set`)
- Per-resource tags for all document products

Receipts `async` remains a **body flag** on `POST /documents` (default `false`) and can be sent via kwargs. `_request` now accepts `{ api_version, skip_partner }` for v1 Settings and release-notification routes.

### Tests and docs

- Active tests: `test/main.test.js` (mocked `_request`). Stream/base64 variants for most products are untested. `delete_tag` has no test.
- `tests/main.test.ts` is stale (`mock_responses = true` skips assertions; it calls renamed methods such as `process_document_url`).
- README examples were updated to valid Node.js calls (`process_document_from_url`) plus line-item, contract, markdown, classify, and extract samples.
- JSDoc on several check/bank-statement files points at the wrong product docs URL.

## Primary coverage table

| Product | API Operation | SDK Method | HTTP Method | Route | Docs URL | Endpoint Coverage | Parameter Coverage | Tests | Recommended Action |
|---|---|---|---|---|---|---|---|---|---|
| Receipts & Invoices | Search Documents | `get_documents` | GET | `/api/v8/partner/documents` | [Search Documents](https://docs.veryfi.com/api/receipts-invoices/search-documents/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Process a Document | `process_document`, `process_document_from_stream`, `process_document_from_base64`, `process_document_from_url` | POST | `/api/v8/partner/documents` | [Process a Document](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Kept `max_pages_to_process` default of `1` on `process_document_from_url` for backward compatibility |
| Receipts & Invoices | Get Submitted PDF | `get_split_documents` | GET | `/api/v8/partner/documents-set` | [Get Submitted PDF](https://docs.veryfi.com/api/receipts-invoices/get-submitted-pdf/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Split and process a PDF | `split_document_from_base64`, `split_document_from_url` | POST | `/api/v8/partner/documents-set` | [Split and process a PDF](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Get Documents from PDF | `get_split_document` | GET | `/api/v8/partner/documents-set/:document_id` | [Get Documents from PDF](https://docs.veryfi.com/api/receipts-invoices/get-documents-from-pdf/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Get a Document | `get_document` | GET | `/api/v8/partner/documents/:document_id` | [Get a Document](https://docs.veryfi.com/api/receipts-invoices/get-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Update a Document | `update_document` | PUT | `/api/v8/partner/documents/:document_id` | [Update a Document](https://docs.veryfi.com/api/receipts-invoices/update-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Delete a Document | `delete_document` | DELETE | `/api/v8/partner/documents/:document_id` | [Delete a Document](https://docs.veryfi.com/api/receipts-invoices/delete-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| Receipts & Invoices | Get document Line Items | — | GET | `/api/v8/partner/documents/:document_id/line-items` | [Get document Line Items](https://docs.veryfi.com/api/receipts-invoices/get-document-line-items/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Create a Line Item | — | POST | `/api/v8/partner/documents/:document_id/line-items` | [Create a Line Item](https://docs.veryfi.com/api/receipts-invoices/create-a-line-item/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Delete all document Line Items | — | DELETE | `/api/v8/partner/documents/:document_id/line-items` | [Delete all document Line Items](https://docs.veryfi.com/api/receipts-invoices/delete-all-document-line-items/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Get a Line Item | — | GET | `/api/v8/partner/documents/:document_id/line-items/:line_item_id` | [Get a Line Item](https://docs.veryfi.com/api/receipts-invoices/get-a-line-item/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Update a Line Item | — | PUT | `/api/v8/partner/documents/:document_id/line-items/:line_item_id` | [Update a Line Item](https://docs.veryfi.com/api/receipts-invoices/update-a-line-item/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Delete a Line Item | — | DELETE | `/api/v8/partner/documents/:document_id/line-items/:line_item_id` | [Delete a Line Item](https://docs.veryfi.com/api/receipts-invoices/delete-a-line-item/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Get Document Tags | — | GET | `/api/v8/partner/documents/:document_id/tags` | [Get Document Tags](https://docs.veryfi.com/api/receipts-invoices/get-document-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Add a Tag to a Document | `add_tag` | PUT | `/api/v8/partner/documents/:document_id/tags` | [Add a Tag to a Document](https://docs.veryfi.com/api/receipts-invoices/add-a-tag-to-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Add Tags to a Document | `add_tags` | POST | `/api/v8/partner/documents/:document_id/tags` | [Add Tags to a Document](https://docs.veryfi.com/api/receipts-invoices/add-tags-to-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Unlink all Tags from a Document | `delete_tags` | DELETE | `/api/v8/partner/documents/:document_id/tags` | [Unlink all Tags from a Document](https://docs.veryfi.com/api/receipts-invoices/unlink-all-tags-from-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Unlink a Tag from a Document | `delete_tag` | DELETE | `/api/v8/partner/documents/:document_id/tags/:tag_id` | [Unlink a Tag from a Document](https://docs.veryfi.com/api/receipts-invoices/unlink-a-tag-from-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Returns a list of document Tax Lines | — | GET | `/api/v8/partner/documents/:document_id/tax-lines` | [Returns a list of document Tax Lines](https://docs.veryfi.com/api/returns-a-list-of-document-tax-lines/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Create a Tax Line | — | POST | `/api/v8/partner/documents/:document_id/tax-lines` | [Create a Tax Line](https://docs.veryfi.com/api/create-a-tax-line/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Returns document Tax Line | — | GET | `/api/v8/partner/documents/:document_id/tax-lines/:tax_line_id` | [Returns document Tax Line](https://docs.veryfi.com/api/returns-document-tax-line/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Update a Tax Line | — | PUT | `/api/v8/partner/documents/:document_id/tax-lines/:tax_line_id` | [Update a Tax Line](https://docs.veryfi.com/api/update-a-tax-line/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Delete a Tax Line | — | DELETE | `/api/v8/partner/documents/:document_id/tax-lines/:tax_line_id` | [Delete a Tax Line](https://docs.veryfi.com/api/delete-a-tax-line/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Receipts & Invoices | Bulk Process Multiple Documents | — | POST | `/api/v8/partner/documents/bulk` | [Bulk Process Multiple Documents](https://docs.veryfi.com/api/receipts-invoices/bulk-process-multiple-documents/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Add a tag to a ∀Doc | — | PUT | `/api/v8/partner/any-documents/:document_id/tags` | [Add a tag to a ∀Doc](https://docs.veryfi.com/api/anydocs/add-a-tag-to-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Add tags to a ∀Doc | — | POST | `/api/v8/partner/any-documents/:document_id/tags` | [Add tags to a ∀Doc](https://docs.veryfi.com/api/anydocs/add-tags-to-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Delete a ∀Doc | `delete_any_document` | DELETE | `/api/v8/partner/any-documents/:document_id` | [Delete a ∀Doc](https://docs.veryfi.com/api/anydocs/delete-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| AnyDocs (∀Docs) | Get a ∀Doc | `get_any_document` | GET | `/api/v8/partner/any-documents/:document_id` | [Get a ∀Doc](https://docs.veryfi.com/api/anydocs/get-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Get ∀Doc tags | `get_any_document_tags` | GET | `/api/v8/partner/any-documents/:document_id/tags` | [Get ∀Doc tags](https://docs.veryfi.com/api/anydocs/get-A-doc-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Get ∀Docs | `get_any_documents` | GET | `/api/v8/partner/any-documents` | [Get ∀Docs](https://docs.veryfi.com/api/anydocs/get-A-docs/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Process a ∀Doc asynchronously | — | POST | `/api/v8/partner/any-documents/async` | [Process a ∀Doc asynchronously](https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Process a ∀Doc | `process_any_document`, `process_any_document_from_stream`, `process_any_document_from_base64`, `process_any_document_from_url` | POST | `/api/v8/partner/any-documents` | [Process a ∀Doc](https://docs.veryfi.com/api/anydocs/process-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Unlink a tag from a ∀Doc | `delete_any_document_tag` | DELETE | `/api/v8/partner/any-documents/:document_id/tags/:tag_id` | [Unlink a tag from a ∀Doc](https://docs.veryfi.com/api/anydocs/unlink-a-tag-from-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Unlink all tags from a ∀Doc | — | DELETE | `/api/v8/partner/any-documents/:document_id/tags` | [Unlink all tags from a ∀Doc](https://docs.veryfi.com/api/anydocs/unlink-all-tags-from-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Update a ∀Doc | — | PUT | `/api/v8/partner/any-documents/:document_id` | [Update a ∀Doc](https://docs.veryfi.com/api/anydocs/update-a-A-doc/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| AnyDocs (∀Docs) | Get Blueprints | — | GET | `/api/v8/partner/blueprints` | [Get Blueprints](https://docs.veryfi.com/api/get-blueprints/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Add a tag to a Bank Statement | — | PUT | `/api/v8/partner/bank-statements/:document_id/tags` | [Add a tag to a Bank Statement](https://docs.veryfi.com/api/bank-statements/add-a-tag-to-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Add tags to a Bank Statement | — | POST | `/api/v8/partner/bank-statements/:document_id/tags` | [Add tags to a Bank Statement](https://docs.veryfi.com/api/bank-statements/add-tags-to-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Delete a Bank Statement | `delete_bank_statement` | DELETE | `/api/v8/partner/bank-statements/:document_id` | [Delete a Bank Statement](https://docs.veryfi.com/api/bank-statements/delete-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| Bank Statements | Get a Bank Statement | `get_bank_statement` | GET | `/api/v8/partner/bank-statements/:document_id` | [Get a Bank Statement](https://docs.veryfi.com/api/bank-statements/get-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Get Bank Statement tags | — | GET | `/api/v8/partner/bank-statements/:document_id/tags` | [Get Bank Statement tags](https://docs.veryfi.com/api/bank-statements/get-bank-statement-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Get Bank Statements | `get_bank_statements` | GET | `/api/v8/partner/bank-statements` | [Get Bank Statements](https://docs.veryfi.com/api/bank-statements/get-bank-statements/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Process a Bank Statement asynchronously | — | POST | `/api/v8/partner/bank-statements/async` | [Process a Bank Statement asynchronously](https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Process a Bank Statement | `process_bank_statement`, `process_bank_statement_from_stream`, `process_bank_statement_from_base64`, `process_bank_statement_from_url` | POST | `/api/v8/partner/bank-statements` | [Process a Bank Statement](https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Unlink a tag from a Bank Statement | — | DELETE | `/api/v8/partner/bank-statements/:document_id/tags/:tag_id` | [Unlink a tag from a Bank Statement](https://docs.veryfi.com/api/bank-statements/unlink-a-tag-from-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Unlink all tags from a Bank Statement | — | DELETE | `/api/v8/partner/bank-statements/:document_id/tags` | [Unlink all tags from a Bank Statement](https://docs.veryfi.com/api/bank-statements/unlink-all-tags-from-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Update a Bank Statement | — | PUT | `/api/v8/partner/bank-statements/:document_id` | [Update a Bank Statement](https://docs.veryfi.com/api/bank-statements/update-a-bank-statement/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Get a Bank Statement set | — | GET | `/api/v8/partner/bank-statements-set/:document_id` | [Get a Bank Statement set](https://docs.veryfi.com/api/get-a-bank-statement-set/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Get Bank Statement sets | — | GET | `/api/v8/partner/bank-statements-set` | [Get Bank Statement sets](https://docs.veryfi.com/api/get-bank-statement-sets/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Bank Statements | Split and process multiple Bank Statements | — | POST | `/api/v8/partner/bank-statements-set` | [Split and process multiple Bank Statements](https://docs.veryfi.com/api/split-and-process-multiple-bank-statements/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Add a tag to a Business Card | — | PUT | `/api/v8/partner/business-cards/:document_id/tags` | [Add a tag to a Business Card](https://docs.veryfi.com/api/add-a-tag-to-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Add tags to a Business Card | — | POST | `/api/v8/partner/business-cards/:document_id/tags` | [Add tags to a Business Card](https://docs.veryfi.com/api/add-tags-to-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Delete a Business Card | `delete_business_card` | DELETE | `/api/v8/partner/business-cards/:document_id` | [Delete a Business Card](https://docs.veryfi.com/api/business-cards/delete-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| Business Cards | Get a Business Card | `get_business_card` | GET | `/api/v8/partner/business-cards/:document_id` | [Get a Business Card](https://docs.veryfi.com/api/business-cards/get-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Get Business Cards | `get_business_cards` | GET | `/api/v8/partner/business-cards` | [Get Business Cards](https://docs.veryfi.com/api/business-cards/get-business-cards/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Process a Business Card | `process_business_card`, `process_business_card_from_stream`, `process_business_card_from_base64`, `process_business_card_from_url` | POST | `/api/v8/partner/business-cards` | [Process a Business Card](https://docs.veryfi.com/api/business-cards/process-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Update a Business Card | — | PUT | `/api/v8/partner/business-cards/:document_id` | [Update a Business Card](https://docs.veryfi.com/api/business-cards/update-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Get Business Card tags | — | GET | `/api/v8/partner/business-cards/:document_id/tags` | [Get Business Card tags](https://docs.veryfi.com/api/get-business-card-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Unlink a tag from a Business Card | — | DELETE | `/api/v8/partner/business-cards/:document_id/tags/:tag_id` | [Unlink a tag from a Business Card](https://docs.veryfi.com/api/unlink-a-tag-from-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Business Cards | Unlink all tags from a Business Card | — | DELETE | `/api/v8/partner/business-cards/:document_id/tags` | [Unlink all tags from a Business Card](https://docs.veryfi.com/api/unlink-all-tags-from-a-business-card/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Add a tag to a Check | — | PUT | `/api/v8/partner/checks/:document_id/tags` | [Add a tag to a Check](https://docs.veryfi.com/api/checks/add-a-tag-to-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Add tags to a Check | — | POST | `/api/v8/partner/checks/:document_id/tags` | [Add tags to a Check](https://docs.veryfi.com/api/checks/add-tags-to-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Delete a Check | `delete_check` | DELETE | `/api/v8/partner/checks/:document_id` | [Delete a Check](https://docs.veryfi.com/api/checks/delete-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| Checks | Get a Check | `get_check` | GET | `/api/v8/partner/checks/:document_id` | [Get a Check](https://docs.veryfi.com/api/checks/get-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Get Check tags | — | GET | `/api/v8/partner/checks/:document_id/tags` | [Get Check tags](https://docs.veryfi.com/api/checks/get-check-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Get Checks | `get_checks` | GET | `/api/v8/partner/checks` | [Get Checks](https://docs.veryfi.com/api/checks/get-checks/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Process a Check asynchronously | — | POST | `/api/v8/partner/checks/async` | [Process a Check asynchronously](https://docs.veryfi.com/api/checks/process-a-check-asynchronously/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Process a Check | `process_check`, `process_check_from_stream`, `process_check_from_base64`, `process_check_from_url` | POST | `/api/v8/partner/checks` | [Process a Check](https://docs.veryfi.com/api/checks/process-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Process a Check With Remittance | — | POST | `/api/v8/partner/check-with-document` | [Process a Check With Remittance](https://docs.veryfi.com/api/checks/process-a-check-with-remittance/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Unlink a tag from a Check | — | DELETE | `/api/v8/partner/checks/:document_id/tags/:tag_id` | [Unlink a tag from a Check](https://docs.veryfi.com/api/checks/unlink-a-tag-from-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Unlink all tags from a Check | — | DELETE | `/api/v8/partner/checks/:document_id/tags` | [Unlink all tags from a Check](https://docs.veryfi.com/api/checks/unlink-all-tags-from-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Checks | Update a Check | — | PUT | `/api/v8/partner/checks/:document_id` | [Update a Check](https://docs.veryfi.com/api/checks/update-a-check/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Add a tag to a Contract | — | PUT | `/api/v8/partner/contracts/:document_id/tags` | [Add a tag to a Contract](https://docs.veryfi.com/api/add-a-tag-to-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Add tags to a Contract | — | POST | `/api/v8/partner/contracts/:document_id/tags` | [Add tags to a Contract](https://docs.veryfi.com/api/add-tags-to-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Delete a Contract | — | DELETE | `/api/v8/partner/contracts/:document_id` | [Delete a Contract](https://docs.veryfi.com/api/contracts/delete-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Get a Contract | — | GET | `/api/v8/partner/contracts/:document_id` | [Get a Contract](https://docs.veryfi.com/api/contracts/get-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Get Contracts | — | GET | `/api/v8/partner/contracts` | [Get Contracts](https://docs.veryfi.com/api/contracts/get-contracts/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Process a Contract | — | POST | `/api/v8/partner/contracts` | [Process a Contract](https://docs.veryfi.com/api/contracts/process-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Update a Contract | — | PUT | `/api/v8/partner/contracts/:document_id` | [Update a Contract](https://docs.veryfi.com/api/contracts/update-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Get Contract tags | — | GET | `/api/v8/partner/contracts/:document_id/tags` | [Get Contract tags](https://docs.veryfi.com/api/get-contract-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Unlink a tag from a Contract | — | DELETE | `/api/v8/partner/contracts/:document_id/tags/:tag_id` | [Unlink a tag from a Contract](https://docs.veryfi.com/api/unlink-a-tag-from-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Contracts | Unlink all tags from a Contract | — | DELETE | `/api/v8/partner/contracts/:document_id/tags` | [Unlink all tags from a Contract](https://docs.veryfi.com/api/unlink-all-tags-from-a-contract/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Add a tag to a W-2 | — | PUT | `/api/v8/partner/w2s/:document_id/tags` | [Add a tag to a W-2](https://docs.veryfi.com/api/add-a-tag-to-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Add tags to a W-2 | — | POST | `/api/v8/partner/w2s/:document_id/tags` | [Add tags to a W-2](https://docs.veryfi.com/api/add-tags-to-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Delete a W-2 | `delete_w2` | DELETE | `/api/v8/partner/w2s/:document_id` | [Delete a W-2](https://docs.veryfi.com/api/w2s/delete-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| W-2s | Get a W-2 | `get_w2` | GET | `/api/v8/partner/w2s/:document_id` | [Get a W-2](https://docs.veryfi.com/api/w2s/get-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Get W-2s | `get_w2s` | GET | `/api/v8/partner/w2s` | [Get W-2s](https://docs.veryfi.com/api/w2s/get-w-2-s/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Process a W-2 | `process_w2`, `process_w2_from_stream`, `process_w2_from_base64`, `process_w2_from_url` | POST | `/api/v8/partner/w2s` | [Process a W-2](https://docs.veryfi.com/api/w2s/process-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Update a W-2 | — | PUT | `/api/v8/partner/w2s/:document_id` | [Update a W-2](https://docs.veryfi.com/api/w2s/update-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Get W-2 tags | — | GET | `/api/v8/partner/w2s/:document_id/tags` | [Get W-2 tags](https://docs.veryfi.com/api/get-w-2-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Unlink a tag from a W-2 | — | DELETE | `/api/v8/partner/w2s/:document_id/tags/:tag_id` | [Unlink a tag from a W-2](https://docs.veryfi.com/api/unlink-a-tag-from-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Unlink all tags from a W-2 | — | DELETE | `/api/v8/partner/w2s/:document_id/tags` | [Unlink all tags from a W-2](https://docs.veryfi.com/api/unlink-all-tags-from-a-w-2/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Get a W-2 set | — | GET | `/api/v8/partner/w2s-set/:document_id` | [Get a W-2 set](https://docs.veryfi.com/api/get-a-w-2-set/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Get W-2 sets | — | GET | `/api/v8/partner/w2s-set` | [Get W-2 sets](https://docs.veryfi.com/api/get-w-2-sets/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-2s | Split and process a PDF with multiple W-2s | — | POST | `/api/v8/partner/w2s-set` | [Split and process a PDF with multiple W-2s](https://docs.veryfi.com/api/split-and-process-a-pdf-with-multiple-w-2-s/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Add a tag to a W-8BEN-E | — | PUT | `/api/v8/partner/w-8ben-e/:document_id/tags` | [Add a tag to a W-8BEN-E](https://docs.veryfi.com/api/add-a-tag-to-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Add tags to a W-8BEN-E | — | POST | `/api/v8/partner/w-8ben-e/:document_id/tags` | [Add tags to a W-8BEN-E](https://docs.veryfi.com/api/add-tags-to-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Delete a W-8BEN-E | `delete_w8bene` | DELETE | `/api/v8/partner/w-8ben-e/:document_id` | [Delete a W-8BEN-E](https://docs.veryfi.com/api/w-8ben-e/delete-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| W-8BEN-E | Get a W-8BEN-E | `get_w8bene` | GET | `/api/v8/partner/w-8ben-e/:document_id` | [Get a W-8BEN-E](https://docs.veryfi.com/api/w-8ben-e/get-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Get W-8BEN-Es | `get_w8benes` | GET | `/api/v8/partner/w-8ben-e` | [Get W-8BEN-Es](https://docs.veryfi.com/api/w-8ben-e/get-w-8-ben-es/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Process a W-8BEN-E | `process_w8bene`, `process_w8bene_from_stream`, `process_w8bene_from_base64`, `process_w8bene_from_url` | POST | `/api/v8/partner/w-8ben-e` | [Process a W-8BEN-E](https://docs.veryfi.com/api/w-8ben-e/process-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Update a W-8BEN-E | — | PUT | `/api/v8/partner/w-8ben-e/:document_id` | [Update a W-8BEN-E](https://docs.veryfi.com/api/w-8ben-e/update-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Get W-8BEN-E tags | — | GET | `/api/v8/partner/w-8ben-e/:document_id/tags` | [Get W-8BEN-E tags](https://docs.veryfi.com/api/get-w-8-ben-e-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Unlink a tag from a W-8BEN-E | — | DELETE | `/api/v8/partner/w-8ben-e/:document_id/tags/:tag_id` | [Unlink a tag from a W-8BEN-E](https://docs.veryfi.com/api/unlink-a-tag-from-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-8BEN-E | Unlink all tags from a W-8BEN-E | — | DELETE | `/api/v8/partner/w-8ben-e/:document_id/tags` | [Unlink all tags from a W-8BEN-E](https://docs.veryfi.com/api/unlink-all-tags-from-a-w-8-ben-e/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Add a tag to a W-9 | — | PUT | `/api/v8/partner/w9s/:document_id/tags` | [Add a tag to a W-9](https://docs.veryfi.com/api/add-a-tag-to-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Add tags to a W-9 | — | POST | `/api/v8/partner/w9s/:document_id/tags` | [Add tags to a W-9](https://docs.veryfi.com/api/add-tags-to-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Delete a W-9 | `delete_w9` | DELETE | `/api/v8/partner/w9s/:document_id` | [Delete a W-9](https://docs.veryfi.com/api/w9s/delete-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Left undocumented `{id}` JSON body on existing DELETE helpers to avoid an unrelated refactor |
| W-9s | Get a W-9 | `get_w9` | GET | `/api/v8/partner/w9s/:document_id` | [Get a W-9](https://docs.veryfi.com/api/w9s/get-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Get W-9s | `get_w9s` | GET | `/api/v8/partner/w9s` | [Get W-9s](https://docs.veryfi.com/api/w9s/get-w-9-s/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Process a W-9 | `process_w9`, `process_w9_from_stream`, `process_w9_from_base64`, `process_w9_from_url` | POST | `/api/v8/partner/w9s` | [Process a W-9](https://docs.veryfi.com/api/w9s/process-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Update a W-9 | — | PUT | `/api/v8/partner/w9s/:document_id` | [Update a W-9](https://docs.veryfi.com/api/w9s/update-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Get W-9 tags | — | GET | `/api/v8/partner/w9s/:document_id/tags` | [Get W-9 tags](https://docs.veryfi.com/api/get-w-9-tags/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Unlink a tag from a W-9 | — | DELETE | `/api/v8/partner/w9s/:document_id/tags/:tag_id` | [Unlink a tag from a W-9](https://docs.veryfi.com/api/unlink-a-tag-from-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| W-9s | Unlink all tags from a W-9 | — | DELETE | `/api/v8/partner/w9s/:document_id/tags` | [Unlink all tags from a W-9](https://docs.veryfi.com/api/unlink-all-tags-from-a-w-9/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Convert a Document to Markdown | — | POST | `/api/v8/partner/parse` | [Convert a Document to Markdown](https://docs.veryfi.com/api/parse/convert-a-document-to-markdown/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Delete a Markdown Document | — | DELETE | `/api/v8/partner/parse/:document_id` | [Delete a Markdown Document](https://docs.veryfi.com/api/parse/delete-a-markdown-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Get a Markdown Document | — | GET | `/api/v8/partner/parse/:document_id` | [Get a Markdown Document](https://docs.veryfi.com/api/parse/get-a-markdown-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Get Markdown Documents | — | GET | `/api/v8/partner/parse` | [Get Markdown Documents](https://docs.veryfi.com/api/parse/get-markdown-documents/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Update a Markdown Document | — | PUT | `/api/v8/partner/parse/:document_id` | [Update a Markdown Document](https://docs.veryfi.com/api/parse/update-a-markdown-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Process a Markdown Document asynchronously | — | POST | `/api/v8/partner/parse/async` | [Process a Markdown Document asynchronously](https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Process a Markdown Document Set | — | POST | `/api/v8/partner/parse-set` | [Process a Markdown Document Set](https://docs.veryfi.com/api/parse/process-a-markdown-document-set/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Get Markdown Document Sets | — | GET | `/api/v8/partner/parse-set` | [Get Markdown Document Sets](https://docs.veryfi.com/api/parse/get-markdown-document-sets/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Parse Documents | Get a Markdown Document Set | — | GET | `/api/v8/partner/parse-set/:document_id` | [Get a Markdown Document Set](https://docs.veryfi.com/api/parse/get-a-markdown-document-set/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Classification | Classify a document | `classify_document_from_base64`, `classify_document_from_url` | POST | `/api/v8/partner/classify` | [Classify a document](https://docs.veryfi.com/api/classify/classify-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Classification | Classify and possibly extract data from a document | — | POST | `/api/v8/partner/extract` | [Classify and possibly extract data from a document](https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Fraud / Device Blocklist | Get devices from blocklist | — | GET | `/api/v8/partner/fraud/blocklist` | [Get devices from blocklist](https://docs.veryfi.com/api/get-devices-from-blocklist/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Fraud / Device Blocklist | Add devices to blocklist | — | POST | `/api/v8/partner/fraud/blocklist` | [Add devices to blocklist](https://docs.veryfi.com/api/add-devices-to-blocklist/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Fraud / Device Blocklist | Remove a device from blocklist | — | DELETE | `/api/v8/partner/fraud/blocklist/:device_id` | [Remove a device from blocklist](https://docs.veryfi.com/api/remove-a-device-from-blocklist/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Platform | Get ocr-counts | — | GET | `/api/v8/partner/ocr-counts` | [Get ocr-counts](https://docs.veryfi.com/api/get-ocr-counts/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Platform | Get OpenAPI schema | — | GET | `/api/v8/partner/documents/schema` | [Get OpenAPI schema](https://docs.veryfi.com/api/get-open-api-schema/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Platform | Get release notifications | — | GET | `/api/v1/release-notifications` | [Get release notifications](https://docs.veryfi.com/api/get-release-notifications/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Retrieve api-keys list | — | GET | `/api/v1/partner/settings/api-keys` | [Retrieve api-keys list](https://docs.veryfi.com/api/settings/retrieve-api-keys-list/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Create api-key | — | POST | `/api/v1/partner/settings/api-keys` | [Create api-key](https://docs.veryfi.com/api/settings/create-api-key/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Retrieve api-key | — | GET | `/api/v1/partner/settings/api-keys/:id` | [Retrieve api-key](https://docs.veryfi.com/api/settings/retrieve-api-key/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Update api-key | — | PUT | `/api/v1/partner/settings/api-keys/:id` | [Update api-key](https://docs.veryfi.com/api/settings/update-api-key/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Revoke api-key | — | DELETE | `/api/v1/partner/settings/api-keys/:id` | [Revoke api-key](https://docs.veryfi.com/api/settings/revoke-api-key/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Rotate api-key | — | POST | `/api/v1/partner/settings/api-keys/:id/rotate` | [Rotate api-key](https://docs.veryfi.com/api/settings/rotate-api-key/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Available permissions | — | GET | `/api/v1/partner/settings/api-keys/available-permissions` | [Available permissions](https://docs.veryfi.com/api/settings/available-permissions/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Verify the calling key | — | GET | `/api/v1/partner/settings/api-keys/verify` | [Verify the calling key](https://docs.veryfi.com/api/settings/verify-the-calling-key/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Retrieve client-keys list | — | GET | `/api/v8/partner/client-keys` | [Retrieve client-keys list](https://docs.veryfi.com/api/settings/retrieve-client-keys-list/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Create client-keys | — | POST | `/api/v8/partner/client-keys` | [Create client-keys](https://docs.veryfi.com/api/settings/create-client-keys/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Remove a client-key | — | DELETE | `/api/v8/partner/client-keys/:id` | [Remove a client-key](https://docs.veryfi.com/api/settings/remove-a-client-key/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Reset client-keys | — | POST | `/api/v8/partner/client-keys/reset` | [Reset client-keys](https://docs.veryfi.com/api/settings/reset-client-keys/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Get Tls Certificates | — | GET | `/api/v8/partner/settings/tls-certificate` | [Get Tls Certificates](https://docs.veryfi.com/api/get-tls-certificates/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Process a Tls Certificate | — | POST | `/api/v8/partner/settings/tls-certificate` | [Process a Tls Certificate](https://docs.veryfi.com/api/process-a-tls-certificate/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Delete a Tls Certificate | — | DELETE | `/api/v8/partner/settings/tls-certificate/:certificate_id` | [Delete a Tls Certificate](https://docs.veryfi.com/api/delete-a-tls-certificate/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Get webhooks | — | GET | `/api/v8/partner/settings/webhooks` | [Get webhooks](https://docs.veryfi.com/api/settings/get-webhooks/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Add a webhook | — | POST | `/api/v8/partner/settings/webhooks` | [Add a webhook](https://docs.veryfi.com/api/settings/add-a-webhook/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |
| Settings | Confirm a webhook | — | POST | `/api/v8/partner/settings/webhooks/confirm` | [Confirm a webhook](https://docs.veryfi.com/api/settings/confirm-a-webhook/) | IMPLEMENTED | IMPLEMENTED | Yes | Implemented |


## PARTIAL parameter comparisons

Kwargs that merge into the **body** are marked **kwargs (body)**. Kwargs passed as `_request` query `params` are **kwargs (query)**. First-class arguments sent as JSON `data` on GET are **body (wrong location)**.

### `process_document` family — [Process a Document](https://docs.veryfi.com/api/receipts-invoices/process-a-document/)

`POST /api/v8/partner/documents` · encoding `application/json` + `multipart/form-data` · async via body `async` (default `false`)

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| `process_document` | `categories` | `string[]` | no (default `""`) | **Dropped** — accepted then not forwarded to `process_document_from_stream` | Pass `categories` through | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| `process_document_from_stream` | `categories` | `string[]` | no | kwargs (body) only | Add a named argument | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| `process_document_from_url` | `max_pages_to_process` | `integer \| null` | no | Named, **default `1`** (docs have no default of 1) | Default to omit / `null` | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `file_data` / `file_url` / `file_urls` / `file` | string / string[] / binary | one-of | Implemented across variants | None | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `file_name` | `string \| null` | no | Named on stream/base64 | None | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `auto_delete` | `boolean \| null` | no | Named | None | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| `process_document_from_url` | `boost_mode` | `boolean \| null` | no (default `false`) | Named | None | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| `process_document_from_url` | `external_id` | `string \| null` | no | Named | None | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `package_path`, `bucket` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `bounding_boxes`, `confidence_details` | `boolean \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `tags` | `string[]` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `async` | `boolean \| null` | no (default `false`) | kwargs (body) | First-class helper or JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `parse_address` | `boolean \| null` | no (default `false`) | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `crop_document` | `boolean \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `compute` | `boolean \| null` | no (default `true`) | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `country` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `document_type` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `thinking`, `thinking_llm_version` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `allowed_async_enrichments` | `DocumentEnrichment[]` | no | kwargs (body); TS type too narrow | Widen `VeryfiExtraArgs` | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `device_data` | object | no | kwargs (body); TS type too narrow | Widen `VeryfiExtraArgs` | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `emailed_receipt_id`, `receipt_id` | `integer \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `detailed` | `boolean \| null` | no | kwargs (body) | Documented as **deprecated** | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |
| all variants | `detect_blur` | `boolean \| null` | no (default `false`) | kwargs (body) | Documented as **deprecated** | [docs](https://docs.veryfi.com/api/receipts-invoices/process-a-document/) |

### `get_documents` — [Search Documents](https://docs.veryfi.com/api/receipts-invoices/search-documents/)

`GET /api/v8/partner/documents` · pagination `page` default 1, `page_size` default 50 (cap 50), `track_total_results` · response `{ documents: object[] }`

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| `get_documents` | `page` | integer | no (default `1`) | **body (wrong location)** | Send as query | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `page_size` | integer | no (default `50`) | **body (wrong location)** | Send as query | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `detailed` | boolean | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `q` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `order_by` | string | no (default `-created`) | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `external_id` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `device_id` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `device_user_uuid` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `status` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `tag` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `owner` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `created__gt/lt/gte/lte` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `updated__gt/lt/gte/lte` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `date__gt/lt/gte/lte` | string | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |
| `get_documents` | `track_total_results` | boolean | no | kwargs (query) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/search-documents/) |

### `get_split_documents` — [Get Submitted PDF](https://docs.veryfi.com/api/receipts-invoices/get-submitted-pdf/)

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| `get_split_documents` | `page` | integer | no (default `1`) | **body (wrong location)** | Send as query | [docs](https://docs.veryfi.com/api/receipts-invoices/get-submitted-pdf/) |
| `get_split_documents` | `page_size` | integer | no (default `50`) | **body (wrong location)** | Send as query | [docs](https://docs.veryfi.com/api/receipts-invoices/get-submitted-pdf/) |

### `get_split_document` — [Get Documents from PDF](https://docs.veryfi.com/api/receipts-invoices/get-documents-from-pdf/)

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| `get_split_document` | `document_id` (path) | int64 | yes | Path has extra `/` plus undocumented `{id}` body | Use `/documents-set/{id}/`; drop body | [docs](https://docs.veryfi.com/api/receipts-invoices/get-documents-from-pdf/) |

### `split_document_*` — [Split and process a PDF](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/)

Completion is delivered via webhook. Encoding: `application/json` + `multipart/form-data`.

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| split helpers | `file` (multipart) | binary | one-of | **Missing** (JSON `file_data`/`file_url` only) | Add file-path/stream variant | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `file_data` | `string \| null` | one-of | Named on base64 | None | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `file_url` / `file_urls` | string / string[] | one-of | Named on URL helper | None | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `file_name` | `string \| null` | no | Named on base64 | None | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `external_id` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `meta.tags` / `tags` | `string[]` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `categories` | `string[]` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `max_pages_to_process` | `integer \| null` | no (default `250`) | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |
| split helpers | `package_path`, `bucket` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/) |

### `classify_document_*` — [Classify a document](https://docs.veryfi.com/api/classify/classify-a-document/)

Encoding: `application/json` + `multipart/form-data`.

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| classify helpers | `file` (multipart) | binary | one-of | **Missing** | Add file-path/stream variant | [docs](https://docs.veryfi.com/api/classify/classify-a-document/) |
| classify helpers | `file_data` | `string \| null` | one-of | Named on base64 | None | [docs](https://docs.veryfi.com/api/classify/classify-a-document/) |
| classify helpers | `file_url` / `file_urls` | string / string[] | one-of | Named on URL helper | None | [docs](https://docs.veryfi.com/api/classify/classify-a-document/) |
| classify helpers | `file_name` | `string \| null` | no | Named on base64 | None | [docs](https://docs.veryfi.com/api/classify/classify-a-document/) |
| classify helpers | `document_types` | object[] / string | no | kwargs (body) | First-class arg + JSDoc | [docs](https://docs.veryfi.com/api/classify/classify-a-document/) |
| classify helpers | `external_id` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/classify/classify-a-document/) |
| classify helpers | `package_path`, `bucket` | `string \| null` | no | kwargs (body) | JSDoc | [docs](https://docs.veryfi.com/api/classify/classify-a-document/) |

`classify_document_from_url` JSDoc currently links to Process a Document instead of Classify.

### GET-by-id helpers that put query flags in the body

Same pattern for `get_any_document`, `get_bank_statement`, `get_business_card`, `get_check`, `get_w8bene`, `get_w9`.

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| `get_any_document` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [Get a ∀Doc](https://docs.veryfi.com/api/anydocs/get-a-A-doc/) |
| `get_any_document` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [Get a ∀Doc](https://docs.veryfi.com/api/anydocs/get-a-A-doc/) |
| `get_bank_statement` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [Get a Bank Statement](https://docs.veryfi.com/api/bank-statements/get-a-bank-statement/) |
| `get_bank_statement` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [Get a Bank Statement](https://docs.veryfi.com/api/bank-statements/get-a-bank-statement/) |
| `get_business_card` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [Get a Business Card](https://docs.veryfi.com/api/business-cards/get-a-business-card/) |
| `get_business_card` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [Get a Business Card](https://docs.veryfi.com/api/business-cards/get-a-business-card/) |
| `get_check` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [Get a Check](https://docs.veryfi.com/api/checks/get-a-check/) |
| `get_check` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [Get a Check](https://docs.veryfi.com/api/checks/get-a-check/) |
| `get_w8bene` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [Get a W-8BEN-E](https://docs.veryfi.com/api/w-8ben-e/get-a-w-8-ben-e/) |
| `get_w8bene` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [Get a W-8BEN-E](https://docs.veryfi.com/api/w-8ben-e/get-a-w-8-ben-e/) |
| `get_w9` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [Get a W-9](https://docs.veryfi.com/api/w9s/get-a-w-9/) |
| `get_w9` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [Get a W-9](https://docs.veryfi.com/api/w9s/get-a-w-9/) |

`get_document` and `get_w2` already send extra kwargs as query params; they are **IMPLEMENTED** with the caveat that flags are kwargs-only and an undocumented `{id}` body is still sent.

### GET list helpers that put pagination in the body

Same pattern for `get_any_documents`, `get_bank_statements`, `get_business_cards`, `get_checks`, `get_w8benes`, `get_w9s`. Extra filters (`q`, date ranges, `meta.tags`, `track_total_results`) are kwargs (query) and can be sent correctly.

| SDK Method | API Parameter | Type | Required | SDK Support | Action | Docs URL |
|---|---|---|---|---|---|---|
| `get_any_documents` | `page` | integer | no (default `1`) | **body (wrong location)** | Send as query | [Get ∀Docs](https://docs.veryfi.com/api/anydocs/get-A-docs/) |
| `get_any_documents` | `page_size` | integer | no (default `50`) | **body (wrong location)** | Send as query | [Get ∀Docs](https://docs.veryfi.com/api/anydocs/get-A-docs/) |
| `get_any_documents` | `bounding_boxes` | boolean | no | **body (wrong location)** | Send as query | [Get ∀Docs](https://docs.veryfi.com/api/anydocs/get-A-docs/) |
| `get_any_documents` | `confidence_details` | boolean | no | **body (wrong location)** | Send as query | [Get ∀Docs](https://docs.veryfi.com/api/anydocs/get-A-docs/) |
| `get_any_documents` | `blueprint_name` | string | no | kwargs (query) | JSDoc | [Get ∀Docs](https://docs.veryfi.com/api/anydocs/get-A-docs/) |
| `get_any_documents` | `template_name` | string | no | kwargs (query) | Documented as **deprecated** | [Get ∀Docs](https://docs.veryfi.com/api/anydocs/get-A-docs/) |
| `get_bank_statements` | `page` / `page_size` / `bounding_boxes` / `confidence_details` | integer / boolean | no | **body (wrong location)** | Send as query | [Get Bank Statements](https://docs.veryfi.com/api/bank-statements/get-bank-statements/) |
| `get_business_cards` | `page` / `page_size` / `bounding_boxes` / `confidence_details` | integer / boolean | no | **body (wrong location)** | Send as query | [Get Business Cards](https://docs.veryfi.com/api/business-cards/get-business-cards/) |
| `get_checks` | `page` / `page_size` / `bounding_boxes` / `confidence_details` | integer / boolean | no | **body (wrong location)** | Send as query | [Get Checks](https://docs.veryfi.com/api/checks/get-checks/) |
| `get_w8benes` | `page` / `page_size` / `bounding_boxes` / `confidence_details` | integer / boolean | no | **body (wrong location)** | Send as query | [Get W-8BEN-Es](https://docs.veryfi.com/api/w-8ben-e/get-w-8-ben-es/) |
| `get_w9s` | `page` / `page_size` / `bounding_boxes` / `confidence_details` | integer / boolean | no | **body (wrong location)** | Send as query | [Get W-9s](https://docs.veryfi.com/api/w9s/get-w-9-s/) |

Shared list filters (kwargs query on all of the above): `meta.tags`, `meta.external_id`, `created_date__gt/lt/gte/lte`, `updated_date__gt/lt/gte/lte`, `q`, `track_total_results`.

`get_w2s` already forwards kwargs as query params and is **IMPLEMENTED**; pagination is kwargs-only and should be documented.

## SDK-only and overlapping methods

These are public helpers, not extra undocumented HTTP endpoints:

| SDK Method | Source | Maps to | Notes |
|---|---|---|---|
| `process_*_from_stream` / `_from_base64` / `_from_url` / file-path wrappers | `lib/*/process*.js` | Same `POST /{resource}` as the process operation | Input-format convenience |
| `replace_tags` | `lib/documents/tags/replaceTags.js` | `PUT /documents/:id` with `{tags}` | Overlaps [Update a Document](https://docs.veryfi.com/api/receipts-invoices/update-a-document/); JSDoc incorrectly links to Add Tags |
| Client constructor, `_request`, `_get_headers`, `_get_url`, `_generate_signature` | `lib/client/` | Transport | Not API operations |

No SDK method was found that calls a route absent from current docs. Trailing slashes (`/documents/` vs `/documents`) are used throughout; docs omit them.

### Obsolete / extra SDK parameters

| Item | Where | Issue |
|---|---|---|
| `{id: document_id}` JSON body | Most GET-by-id and DELETE helpers | Not documented |
| `auto_delete` on W-2 process | `process_w2*` | Not on current [Process a W-2](https://docs.veryfi.com/api/w2s/process-a-w-2/) body (it is on several `/async` pages) |
| `template_name` | AnyDocs kwargs | Documented as deprecated on process/list |
| `detailed`, `detect_blur` | Receipts process kwargs | Documented as deprecated |

### Incorrect HTTP methods

None of the implemented operations use the wrong verb. `add_tag` correctly uses `PUT .../tags` with `{name}`; `add_tags` correctly uses `POST .../tags` with `{tags}`.

## Missing TypeScript / JSDoc

- All 70 public methods are declared in `lib/types/Client.ts`.
- `VeryfiExtraArgs` cannot express arrays or nested objects required by several documented fields.
- JSDoc almost never lists kwargs keys; callers must read docs.veryfi.com.
- Return types are often `JsonObject` / `any`. `get_business_card` is typed as `Promise<JsonObject[]>` but returns one object.
- `get_w2` TypeScript comments mention `bounding_boxes` / `confidence_details` that the JS implementation does not take as named args.
- `process_w2` TS docs mention `delete_after_processing`; JS uses `auto_delete`.

## Missing tests

Covered in `test/main.test.js` (mocked): classify (2), documents process/get/update/delete/tags except `delete_tag`, split (4), anydocs process/get/delete/get-tags/unlink-tag, plus process/get/delete for business cards, bank statements, checks, W-2, W-8BEN-E, W-9.

Not covered:

- `delete_tag`
- `*_from_stream` / `*_from_base64` except receipts process
- `process_any_document_from_stream` / `_from_base64`
- Parameter location (query vs body) for list/get
- The double-slash split GET path
- `tests/main.test.ts` (stale names; assertions skipped)

## Suggested implementation order

Implementation of the previously listed MISSING/PARTIAL operations is complete. Compatibility notes:

1. `process_document_from_url` still defaults `max_pages_to_process` to `1` so existing callers do not change behavior.
2. Existing DELETE helpers still send an undocumented `{id}` JSON body (no unrelated refactor).
3. `document_types` is a kwargs field on existing classify helpers (inserting a positional arg would break callers). New `classify_document` / `extract_document*` methods document it; extract requires it.
4. Parse-set and TLS certificate process bodies are still undocumented by Veryfi; methods accept kwargs.
5. Lens, getting-started, and conceptual fraud pages remain out of scope (not REST partner operations).

## Uncertain documentation notes

These pages were opened; they are not extra operations, but request bodies are incomplete in the docs:

- [Process a Markdown Document Set](https://docs.veryfi.com/api/parse/process-a-markdown-document-set/) — empty Request section
- [Process a Tls Certificate](https://docs.veryfi.com/api/process-a-tls-certificate/) — empty Request section
- [Create client-keys](https://docs.veryfi.com/api/settings/create-client-keys/) / [Reset client-keys](https://docs.veryfi.com/api/settings/reset-client-keys/) — no body documented
- Live OpenAPI at `GET /api/v8/partner/documents/schema` was not fetched (auth required)

## Totals (repeat)

| Metric | Count |
|---|---|
| Total documented API operations | 151 |
| Fully implemented | 151 |
| Partially implemented | 0 |
| Missing | 0 |
| Uncertain | 0 |
| SDK-only / convenience methods | 90+ |
