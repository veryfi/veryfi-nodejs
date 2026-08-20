import {VeryfiDocument} from "./VeryfiDocument";
import {JsonObject, VeryfiExtraArgs} from "./VeryfiExtraArgs";
import {Tag} from "./Tag";
import * as stream from "node:stream";

export declare class Client {
    /**
     * Create instance of a Client
     * @class
     * @param {string} client_id Your Veryfi client id
     * @param {string | undefined} client_secret Your Veryfi client secret
     * @param {string} username Your Veryfi username
     * @param {string} api_key Your Veryfi API key
     * @param {string} base_url
     * @param {number} timeout
     */
    constructor(
        client_id: string,
        client_secret: string | undefined,
        username: string,
        api_key: string,
        base_url?: string,
        timeout?: number
    );

    client_id: string;
    client_secret: string | undefined;
    username: string;
    api_key: string;
    base_url: string;
    api_version: string;
    private _get_headers;
    private _get_url;
    private _generate_signature;

    /**
     * Submit the HTTP request.
     * @private
     * @param {string} http_verb HTTP Method
     * @param {string} endpoint_name Endpoint name such as 'documents', 'users', etc.
     * @param {{}} request_arguments JSON payload to send to Veryfi
     * @param params {{}} query params.
     * @param {Boolean} has_files Are there any files to be submitted as binary
     * @param {Object} [options] Optional request options
     * @param {string} [options.api_version] Override the default API version (v8)
     * @param {boolean} [options.skip_partner] Skip the /partner path segment (used by some v1 routes)
     * @returns {JSON} A JSON of the response data.
     */
    public _request(http_verb: String, endpoint_name: String, request_arguments: Object, params?: Object, has_files?: boolean, options?: { api_version?: string; skip_partner?: boolean }): Promise<any>;

    /**
     * Classify a document. https://docs.veryfi.com/api/classify/classify-a-document/
     * @example
     * veryfi_client.classify_document_from_base64('base64_encoded_string',
     *                                'receipt.png',
     *                                {'extra': 'parameters'})
     *
     * @memberof Client
     * @param {String} base64_encoded_string Buffer string of a file to submit for classify and data extraction
     * @param {String} file_name The file name including the extension
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} JSON of document classification
     */
    public classify_document_from_base64(
        base64_encoded_string: string,
        file_name: string,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Classify document. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
     * @memberof Client
     * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. 'https://cdn.example.com/receipt.jpg'.
     * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ['https://cdn.example.com/receipt1.jpg', 'https://cdn.example.com/receipt2.jpg']
     * @param {VeryfiExtraArgs} kwargs Additional request parameters
     * @returns {JSON} JSON of document classification
     */
    public classify_document_from_url(
        file_url?: string,
        file_urls?: string[],
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Veryfi's PDF Splitter allows you to split a multipage PDF with different receipts and invoices inside into multiple Documents. This API supports .pdf,.zip. Min file size is 250bytes. The max pdf file size is 50mb. https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/
     * @memberof Client
     * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. 'https://cdn.example.com/receipt.jpg'.
     * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ['https://cdn.example.com/receipt1.jpg', 'https://cdn.example.com/receipt2.jpg']
     * @param {VeryfiExtraArgs} kwargs Additional request parameters
     * @returns {JSON} JSON of document classification
     */
    public split_document_from_url(
        file_url?: string,
        file_urls?: string[],
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Veryfi's PDF Splitter allows you to split a multipage PDF with different receipts and invoices inside into multiple Documents. This API supports .pdf,.zip. Min file size is 250bytes. The max pdf file size is 50mb. https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/
     * @example
     * veryfi_client.split_document_from_base64('base64_encoded_string',
     *                                'receipt.png',
     *                                {'extra': 'parameters'})
     *
     * @memberof Client
     * @param {String} base64_encoded_string Buffer string of a file to submit for classify and data extraction
     * @param {String} file_name The file name including the extension
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} JSON of document classification
     */
    public split_document_from_base64(
        base64_encoded_string: string,
        file_name: string,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Veryfi's Get a Documents from PDF endpoint allows you to retrieve a collection of previously processed documents. https://docs.veryfi.com/api/receipts-invoices/get-documents-from-pdf/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to retrieve
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of data extracted from the document
     */
    public get_split_document(document_id: string,
                        {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;

    /**
     * Veryfi's Get a Submitted PDF endpoint allows you to retrieve a collection of previously processed documents. https://docs.veryfi.com/api/receipts-invoices/get-submitted-pdf/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of previously processed documents
     */
    public get_split_documents(
        page?: number,
        page_size?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Delete document from Veryfi. https://docs.veryfi.com/api/receipts-invoices/delete-a-document/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
     */
    public delete_document(document_id: string): Promise<any>;

    /**
     * Retrieve document by ID. https://docs.veryfi.com/api/receipts-invoices/get-a-document/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to retrieve
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
     */
    public get_document(document_id: string,
                        {...kwargs}?: VeryfiExtraArgs): Promise<VeryfiDocument>;

    /**
     * Get all documents. https://docs.veryfi.com/api/receipts-invoices/search-documents/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<VeryfiDocument>} Object of previously processed documents
     */
    public get_documents(
        page?: number,
        page_size?: number,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process a document and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
     * @example
     * veryfi_client.process_document(
     *   'file/path',
     *   ['Entertainment', 'Food'],
     *   true,
     *   { extra: 'parameters' }
     * )
     * @memberof Client
     * @param {string} file_path Path on disk to a file to submit for data extraction
     * @param {string[]} categories List of categories Veryfi can use to categorize the document
     * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
     * @param {VeryfiExtraArgs} kwargs Additional request parameters
     * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
     */
    public process_document(
        file_path: string,
        categories?: string[],
        auto_delete?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<VeryfiDocument>;

    /**
     * Process a document and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
     * @example
     * veryfi_client.process_document_from_base64('base64_encoded_string',
     *                                'receipt.png',
     *                                ['Entertainment','Food'],
     *                                true,
     *                                {'extra': 'parameters'})
     *
     * @memberof Client
     * @param {String} base64_encoded_string Buffer string of a file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {Array} categories List of categories Veryfi can use to categorize the document
     * @param {Boolean} auto_delete Delete this document from Veryfi after data has been extracted
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_document_from_base64(
        base64_encoded_string: string,
        file_name: string,
        categories?: string[],
        auto_delete?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<VeryfiDocument>;

    /**
     * Process a document and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
     *
     * @memberof Client
     * @param {stream.Readable} file ReadStream of a file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {Boolean} auto_delete Delete this document from Veryfi after data has been extracted
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_document_from_stream(
        file: stream.Readable,
        file_name: string,
        auto_delete?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<VeryfiDocument>;

    /**
     * Process document from url and extract all the fields from it. https://docs.veryfi.com/api/receipts-invoices/process-a-document/
     * @memberof Client
     * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. 'https://cdn.example.com/receipt.jpg'.
     * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ['https://cdn.example.com/receipt1.jpg', 'https://cdn.example.com/receipt2.jpg']
     * @param {string[]} categories List of categories to use when categorizing the document
     * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
     * @param {boolean} boost_mode Flag that tells Veryfi whether boost mode should be enabled. When set to 1, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is 0
     * @param {string} external_id Optional custom document identifier. Use this if you would like to assign your own ID to documents
     * @param {number} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {VeryfiExtraArgs} kwargs Additional request parameters
     * @return {Promise<VeryfiDocument>} Object of data extracted from the document
     */
    public process_document_from_url(
        file_url?: string,
        file_urls?: string[],
        categories?: string[],
        auto_delete?: boolean,
        boost_mode?: boolean,
        external_id?: string,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<VeryfiDocument>;

    /**
     * Update data for a previously processed document, including almost any field like `vendor`, `date`, `notes` etc.
     * https://docs.veryfi.com/api/receipts-invoices/update-a-document/
     * @example
     * veryfi_client.update_document(
     *   id,
     *   { date: '2021-01-01', notes: 'look what I did' }
     * )
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to update
     * @param {VeryfiExtraArgs} kwargs fields to update
     * @return {Promise<VeryfiDocument>} Object of data extracted from the document with updated fields, if fields are writable. Otherwise, a document with unchanged fields.
     */
    public update_document(
        document_id: string,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<VeryfiDocument>;


    /**
     * Delete any document from Veryfi. https://docs.veryfi.com/api/receipts-invoices/delete-a-document/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<any>} Object of data extracted from the document
     */
    public delete_any_document(document_id: string): Promise<any>;

    /**
     * Get a specific any document. https://docs.veryfi.com/api/anydocs/get-a-%E2%88%80-doc/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
     */
    public get_any_document(document_id: number,
                            bounding_boxes?: boolean,
                            confidence_details?: boolean,
                            {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;

    /**
     * Get all any documents. https://docs.veryfi.com/api/anydocs/get-%E2%88%80-docs/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of previously processed any documents
     */
    public get_any_documents(page?: number,
                             page_size?: number,
                             bounding_boxes?: boolean,
                             confidence_details?: boolean,
                             {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;

    /**
     * Return all tags assigned to a specific any document. https://docs.veryfi.com/api/anydocs/get-A-doc-tags/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<{tags: Tag[]}>} List of tags assigned to a specific any document.
     */
    public get_any_document_tags(document_id: number,
                                 {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;

    /**
     * Unlink a tag from a specific any document. https://docs.veryfi.com/api/anydocs/unlink-a-tag-from-a-A-doc/
     *
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to unlink the tag from
     * @param {string} tag_id ID of the tag you'd like to unlink
     * @return {Promise<any>} response about the unlinked tag.
     */
    public delete_any_document_tag(document_id: string, tag_id: string): Promise<any>;

    /**
     * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
     * @example
     * veryfi_client.process_any_document('file/path','template_name')
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {String} blueprint_name The name of the extraction blueprints to use.
     * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_any_document(
        file_path: string,
        blueprint_name?: string,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
     *
     * @memberof Client
     * @param {stream.Readable} file ReadStream of a file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {String} blueprint_name The name of the extraction blueprints to use.
     * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_any_document_from_stream(
        file: stream.Readable,
        file_name: string,
        blueprint_name?: string,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension
     * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
     * @param {String} blueprint_name The name of the extraction blueprints to use.
     * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_any_document_from_base64(
        file_name: string,
        file_base64_string: string,
        blueprint_name?: string,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
     * @example
     * veryfi_client.process_any_document_url('file_url','template_name')
     *
     * @memberof Client
     * @param {String} file_url url file to submit for data extraction
     * @param {String} blueprint_name The name of the extraction blueprints to use.
     * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_any_document_from_url(
        file_url: string,
        blueprint_name?: string,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Delete bank statement document from Veryfi. https://docs.veryfi.com/api/bank-statements/delete-a-bank-statement/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<any>} Object of data extracted from the document
     */
    public delete_bank_statement(document_id: string): Promise<any>;

    /**
     * Get a specific bank statement. https://docs.veryfi.com/api/bank-statements/get-a-bank-statement/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
     */
    public get_bank_statement(document_id: number,
                              bounding_boxes?: boolean,
                              confidence_details?: boolean,
                              {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;

    /**
     * Get all bank statements. https://docs.veryfi.com/api/bank-statements/get-bank-statements/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of previously processed any documents
     */
    public get_bank_statements(
        page?: number,
        page_size?: number,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process bank statement and extract all the fields from it. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/
     * @example
     * veryfi_client.process_bank_statement('file/path')
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_bank_statement(
        file_path: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process bank statement and extract all the fields from it. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/
     *
     * @memberof Client
     * @param {stream.Readable} file file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_bank_statement_from_stream(
        file: stream.Readable,
        file_name: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process bank statement and extract all the fields from it. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/
     * @example
     * veryfi_client.process_bank_statement('file/path')
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension
     * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_bank_statement_from_base64(
        file_name: string,
        file_base64_string: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process bank statement document and extract all the fields from it. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement/
     * @example
     * veryfi_client.process_bank_statement_url('file_url')
     *
     * @memberof Client
     * @param {String} file_url url file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_bank_statement_from_url(
        file_url: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Delete business card document from Veryfi. https://docs.veryfi.com/api/business-cards/delete-a-business-card/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<any>} Object of data extracted from the document
     */
    public delete_business_card(document_id: string): Promise<any>;

    /**
     * Get a specific business card. https://docs.veryfi.com/api/business-cards/get-a-business-card/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
     */
    public get_business_card(document_id: number,
                             bounding_boxes?: boolean,
                             confidence_details?: boolean,
                             {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject[]>;

    /**
     * Get all business cards. https://docs.veryfi.com/api/business-cards/get-business-cards/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {Promise<JsonObject>} Object of previously processed any documents
     */
    public get_business_cards(
        page?: number,
        page_size?: number,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject[]>;

    /**
     * Process business card and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
     * @example
     * veryfi_client.process_business_card('file/path')
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_business_card(
        file_path: string,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process business card and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
     *
     * @memberof Client
     * @param {stream.Readable} file ReadStream of a file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_business_card_from_stream(
        file: stream.Readable,
        file_name: string,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process business card and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension
     * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_business_card_from_base64(
        file_name: string,
        file_base64_string?: string,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process business card document and extract all the fields from it. https://docs.veryfi.com/api/business-cards/process-a-business-card/
     * @example
     * veryfi_client.process_business_card_url('file_url')
     *
     * @memberof Client
     * @param {String} file_url url file to submit for data extraction
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_business_card_from_url(
        file_url: string,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;


    /**
     * Delete a check document from Veryfi. https://docs.veryfi.com/api/checks/delete-a-check/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<any>} Object of data extracted from the document
     */
    public delete_check(document_id: string): Promise<any>;

    /**
     * Get a specific check. https://docs.veryfi.com/api/checks/get-a-check/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
     */
    public get_check(document_id: number,
                     bounding_boxes?: boolean,
                     confidence_details?: boolean,
                     {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject[]>;

    /**
     * Get all checks. https://docs.veryfi.com/api/checks/get-checks/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of previously processed any documents
     */
    public get_checks(
        page?: number,
        page_size?: number,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject[]>;

    /**
     * Process check and extract all the fields from it. https://docs.veryfi.com/api/checks/process-a-check/
     * @example
     * veryfi_client.process_check('file/path')
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_check(
        file_path: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process check and extract all the fields from it. https://docs.veryfi.com/api/checks/process-a-check/
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension
     * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_check_from_base64(
        file_name: string,
        file_base64_string: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process check and extract all the fields from it. https://docs.veryfi.com/api/checks/process-a-check/
     *
     * @memberof Client
     * @param {stream.Readable} file file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_check_from_stream(
        file: stream.Readable,
        file_name: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process a check document and extract all the fields from it. https://docs.veryfi.com/api/checks/process-a-check/
     * @example
     * veryfi_client.process_check_url('file_url')
     *
     * @memberof Client
     * @param {String} file_url url file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_check_from_url(
        file_url: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Delete w2 document from Veryfi. https://docs.veryfi.com/api/w2s/delete-a-w2/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<any>} Object of data extracted from the document
     */
    public delete_w2(document_id: string): Promise<any>;

    /**
     * Get a specific w2. https://docs.veryfi.com/api/w2s/get-a-w-2/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
     */
    public get_w2(document_id: number,
                  bounding_boxes?: boolean,
                  confidence_details?: boolean,
                  {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject[]>;

    /**
     * Get all w2s. https://docs.veryfi.com/api/w2s/get-w-2-s/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of previously processed any documents
     */
    public get_w2s(
        page?: number,
        page_size?: number,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject[]>;

    /**
     * Process w2 and extract all the fields from it. https://docs.veryfi.com/api/w2s/process-a-w-2/
     * @example
     * veryfi_client.process_w2('file/path')
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w2(
        file_path: string,
        delete_after_processing?: boolean,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process w2 and extract all the fields from it. https://docs.veryfi.com/api/w2s/process-a-w-2/
     *
     * @memberof Client
     * @param {stream.Readable} file file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w2_from_stream(
        file: stream.Readable,
        file_name: string,
        auto_delete?: boolean,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process w2 and extract all the fields from it. https://docs.veryfi.com/api/w2s/process-a-w-2/
     * @example
     * veryfi_client.process_w2_from_base64('file/path')
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension
     * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}
     * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w2_from_base64(
        file_name: string,
        file_base64_string?: string,
        auto_delete?: boolean,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process w2 document and extract all the fields from it. https://docs.veryfi.com/api/w2s/process-a-w-2/
     * @example
     * veryfi_client.process_w2_url('file_url')
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension
     * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
     * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
     * @param {boolean} auto_delete Delete this document from Veryfi after data has been extracted
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @returns {JsonObject} Data extracted from the document
     */
    public process_w2_from_url(
        file_name: string,
        file_url: string,
        file_urls?: string[],
        auto_delete?: boolean,
        max_pages_to_process?: number,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;


    /**
     * Delete  W-8BEN-E document from Veryfi. https://docs.veryfi.com/api/w-8ben-e/delete-a-w-8-ben-e/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<any>} Object of data extracted from the document
     */
    public delete_w8bene(document_id: string): Promise<any>;

    /**
     * Get a specific  W-8BEN-E. https://docs.veryfi.com/api/w-8ben-e/get-a-w-8-ben-e/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
     */
    public get_w8bene(document_id: number,
                      bounding_boxes?: boolean,
                      confidence_details?: boolean,
                      {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject[]>;

    /**
     * Get all W-8BEN-E. https://docs.veryfi.com/api/w-8ben-e/get-w-8-ben-es/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of previously processed any documents
     */
    public get_w8benes(
        page?: number,
        page_size?: number,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject[]>;

    /**
     * Process W-8BEN-E and extract all the fields from it. https://docs.veryfi.com/api/w-8ben-e/process-a-w-8-ben-e/
     * @example
     * veryfi_client.process_w8bene('file/path')
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w8bene(
        file_path: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process W-8BEN-E and extract all the fields from it. https://docs.veryfi.com/api/w-8ben-e/process-a-w-8-ben-e/
     *
     * @memberof Client
     * @param {stream.Readable} file file to submit for data extraction
     * @param {String} file_name The file name including the extension.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w8bene_from_stream(
        file: stream.Readable,
        file_name: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process W-8BEN-E and extract all the fields from it. https://docs.veryfi.com/api/w-8ben-e/process-a-w-8-ben-e/
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension.
     * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w8bene_from_base64(
        file_name: string,
        file_base64_string: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process W-8BEN-E document and extract all the fields from it. https://docs.veryfi.com/api/w-8ben-e/process-a-w-8-ben-e/
     * @example
     * veryfi_client.process_w8bene_from_url('file_url')
     *
     * @memberof Client
     * @param {String} file_url url file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w8bene_from_url(
        file_url: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;


    /**
     * Delete W9 document from Veryfi. https://docs.veryfi.com/api/w9s/delete-a-w-9/
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to delete
     * @returns {Promise<any>} Object of data extracted from the document
     */
    public delete_w9(document_id: string): Promise<any>;

    /**
     * Get a specific w9. https://docs.veryfi.com/api/w9s/get-a-w-9/
     * @memberof Client
     * @param {number} document_id The unique identifier of the document.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
     */
    public get_w9(document_id: number,
                  bounding_boxes?: boolean,
                  confidence_details?: boolean,
                  {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject[]>;

    /**
     * Get all w9s. https://docs.veryfi.com/api/w9s/get-w-9-s/
     * @memberof Client
     * @param {number} page The page number. The response is capped to maximum of 50 results per page.
     * @param {number} page_size The number of Documents per page.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters.
     * @returns {Promise<JsonObject>} Object of previously processed any documents
     */
    public get_w9s(
        page?: number,
        page_size?: number,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject[]>;

    /**
     * Process w9 and extract all the fields from it. https://docs.veryfi.com/api/w9s/process-a-w-9/
     * @example
     * veryfi_client.process_w9('file/path')
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w9(
        file_path: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process w9 and extract all the fields from it. https://docs.veryfi.com/api/w9s/process-a-w-9/
     *
     * @memberof Client
     * @param {stream.Readable} file file to submit for data extraction
     * @param {String} file_name The file name including the extension.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w9_from_stream(
        file: stream.Readable,
        file_name: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process w9 and extract all the fields from it. https://docs.veryfi.com/api/w9s/process-a-w-9/
     * @example
     * veryfi_client.process_w9_from_base64('file/path')
     *
     * @memberof Client
     * @param {String} file_name The file name including the extension.
     * @param {String} file_base64_string To submit a file for data extraction, encode the file in Base64 format and ensure it includes the MIME type. The Base64 string should follow this structure: data:${mimeType};base64,${base64String}.
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w9_from_base64(
        file_name: string,
        file_base64_string: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;

    /**
     * Process w9 document and extract all the fields from it. https://docs.veryfi.com/api/w9s/process-a-w-9/
     * @example
     * veryfi_client.process_w9_url('file_url')
     *
     * @memberof Client
     * @param {String} file_url url file to submit for data extraction
     * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
     * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    public process_w9_from_url(
        file_url: string,
        bounding_boxes?: boolean,
        confidence_details?: boolean,
        {...kwargs}?: VeryfiExtraArgs
    ): Promise<JsonObject>;


    /**
     * Add a new tag on an existing document. https://docs.veryfi.com/api/receipts-invoices/add-a-tag-to-a-document/
     *
     * @param {number} document_id ID of the document you'd like to add a Tag
     * @param {string} tag name to add
     * @return {Promise<Tag>} response about tag added.
     */
    public add_tag(document_id: string, tag: string): Promise<Tag>;

    /**
     * Delete all tags on an existing document. https://docs.veryfi.com/api/receipts-invoices/unlink-all-tags-from-a-document/
     *
     * @param {number} document_id ID of the document you'd like to delete all Tags
     * @return {Promise<any>} response about deleted tags.
     */
    public delete_tags(document_id: string): Promise<any>;

    /**
     * Unlink a tag from a document. https://docs.veryfi.com/api/receipts-invoices/unlink-a-tag-from-a-document/
     *
     * @memberof Client
     * @param {string} document_id ID of the document you'd like to unlink the tag from
     * @param {string} tag_id ID of the tag you'd like to unlink
     * @return {Promise<any>} response about the unlinked tag.
     */
    public delete_tag(document_id: string, tag_id: string): Promise<any>;

    /**
     * Add multiple tags on an existing document. https://docs.veryfi.com/api/receipts-invoices/add-tags-to-a-document/
     *
     * @param {number} document_id ID of the document you'd like to add a Tag
     * @param {string[]} tags name to add
     * @return {Promise<Tag>} response about tags added.
     */
    public add_tags(document_id: string, tags: string[]): Promise<Tag>;

    /**
     * Replace multiple tags on an existing document. https://docs.veryfi.com/api/receipts-invoices/add-tags-to-a-document/
     *
     * @param {number} document_id ID of the document you'd like to add a Tag
     * @param {string[]} tags names to be added
     * @return {Promise<Tag>} response about tags added.
     */
    public replace_tags(document_id: string, tags: string[]): Promise<Tag>;

/**
     * Classify a document. https://docs.veryfi.com/api/classify/classify-a-document/
     */
    public classify_document(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Classify a document from a file stream. https://docs.veryfi.com/api/classify/classify-a-document/
     */
    public classify_document_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Get document line items. https://docs.veryfi.com/api/receipts-invoices/get-document-line-items/ */
    public get_document_line_items(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Create a line item. https://docs.veryfi.com/api/receipts-invoices/create-a-line-item/ */
    public create_line_item(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Delete all document line items. https://docs.veryfi.com/api/receipts-invoices/delete-all-document-line-items/ */
    public delete_document_line_items(document_id: string): Promise<any>;
/** Get a line item. https://docs.veryfi.com/api/receipts-invoices/get-a-line-item/ */
    public get_line_item(document_id: string, line_item_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Update a line item. https://docs.veryfi.com/api/receipts-invoices/update-a-line-item/ */
    public update_line_item(document_id: string, line_item_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Delete a line item. https://docs.veryfi.com/api/receipts-invoices/delete-a-line-item/ */
    public delete_line_item(document_id: string, line_item_id: string): Promise<any>;
/** Get document tags. https://docs.veryfi.com/api/receipts-invoices/get-document-tags/ */
    public get_document_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/** Get document tax lines. https://docs.veryfi.com/api/returns-a-list-of-document-tax-lines/ */
    public get_tax_lines(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Create a tax line. https://docs.veryfi.com/api/create-a-tax-line/ */
    public create_tax_line(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Get a document tax line. https://docs.veryfi.com/api/returns-document-tax-line/ */
    public get_tax_line(document_id: string, tax_line_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Update a tax line. https://docs.veryfi.com/api/update-a-tax-line/ */
    public update_tax_line(document_id: string, tax_line_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Delete a tax line. https://docs.veryfi.com/api/delete-a-tax-line/ */
    public delete_tax_line(document_id: string, tax_line_id: string): Promise<any>;
/** Bulk process multiple documents. https://docs.veryfi.com/api/receipts-invoices/bulk-process-multiple-documents/ */
    public process_documents_bulk(file_urls: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add a tag to a any document. https://docs.veryfi.com/api/anydocs/add-a-tag-to-a-A-doc/
     */
    public add_any_document_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a any document. https://docs.veryfi.com/api/anydocs/add-tags-to-a-A-doc/
     */
    public add_any_document_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Unlink all tags from a any document. https://docs.veryfi.com/api/anydocs/unlink-all-tags-from-a-A-doc/
     */
    public delete_any_document_tags(document_id: string): Promise<any>;
/**
     * Update a any document. https://docs.veryfi.com/api/anydocs/update-a-A-doc/
     */
    public update_any_document(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get Blueprints. https://docs.veryfi.com/api/get-blueprints/
     */
    public get_blueprints({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Process a any document asynchronously. https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/
     */
    public process_any_document_async(file_path: string, blueprint_name?: string, max_pages_to_process?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a any document asynchronously from a file stream. https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/
     */
    public process_any_document_async_from_stream(file: stream.Readable, file_name: string, blueprint_name?: string, max_pages_to_process?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a any document asynchronously from a base64 string. https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/
     */
    public process_any_document_async_from_base64(file_name: string, file_base64_string: string, blueprint_name?: string, max_pages_to_process?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a any document asynchronously from a URL. https://docs.veryfi.com/api/anydocs/process-a-A-doc-asynchronously/
     */
    public process_any_document_async_from_url(file_url?: string, file_urls?: string[], blueprint_name?: string, max_pages_to_process?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add a tag to a bank statement. https://docs.veryfi.com/api/bank-statements/add-a-tag-to-a-bank-statement/
     */
    public add_bank_statement_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a bank statement. https://docs.veryfi.com/api/bank-statements/add-tags-to-a-bank-statement/
     */
    public add_bank_statement_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Get tags assigned to a bank statement. https://docs.veryfi.com/api/bank-statements/get-bank-statement-tags/
     */
    public get_bank_statement_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/**
     * Unlink a tag from a bank statement. https://docs.veryfi.com/api/bank-statements/unlink-a-tag-from-a-bank-statement/
     */
    public delete_bank_statement_tag(document_id: string, tag_id: string): Promise<any>;
/**
     * Unlink all tags from a bank statement. https://docs.veryfi.com/api/bank-statements/unlink-all-tags-from-a-bank-statement/
     */
    public delete_bank_statement_tags(document_id: string): Promise<any>;
/**
     * Update a bank statement. https://docs.veryfi.com/api/bank-statements/update-a-bank-statement/
     */
    public update_bank_statement(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Process a bank statement asynchronously. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/
     */
    public process_bank_statement_async(file_path: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a bank statement asynchronously from a file stream. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/
     */
    public process_bank_statement_async_from_stream(file: stream.Readable, file_name: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a bank statement asynchronously from a base64 string. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/
     */
    public process_bank_statement_async_from_base64(file_name: string, file_base64_string: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a bank statement asynchronously from a URL. https://docs.veryfi.com/api/bank-statements/process-a-bank-statement-asynchronously/
     */
    public process_bank_statement_async_from_url(file_url?: string, file_urls?: string[], bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Split and process multiple bank statements. https://docs.veryfi.com/api/split-and-process-multiple-bank-statements/
     */
    public split_bank_statements(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Split and process multiple bank statements from a file stream. https://docs.veryfi.com/api/split-and-process-multiple-bank-statements/
     */
    public split_bank_statements_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Split and process multiple bank statements from a base64 string. https://docs.veryfi.com/api/split-and-process-multiple-bank-statements/
     */
    public split_bank_statements_from_base64(file_name: string, file_base64_string: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Split and process multiple bank statements from a URL. https://docs.veryfi.com/api/split-and-process-multiple-bank-statements/
     */
    public split_bank_statements_from_url(file_url?: string, file_urls?: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get Bank Statement sets. https://docs.veryfi.com/api/get-bank-statement-sets/
     */
    public get_bank_statement_sets(page?: number, page_size?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get a Bank Statement set. https://docs.veryfi.com/api/get-a-bank-statement-set/
     */
    public get_bank_statement_set(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add a tag to a business card. https://docs.veryfi.com/api/add-a-tag-to-a-business-card/
     */
    public add_business_card_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a business card. https://docs.veryfi.com/api/add-tags-to-a-business-card/
     */
    public add_business_card_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Get tags assigned to a business card. https://docs.veryfi.com/api/get-business-card-tags/
     */
    public get_business_card_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/**
     * Unlink a tag from a business card. https://docs.veryfi.com/api/unlink-a-tag-from-a-business-card/
     */
    public delete_business_card_tag(document_id: string, tag_id: string): Promise<any>;
/**
     * Unlink all tags from a business card. https://docs.veryfi.com/api/unlink-all-tags-from-a-business-card/
     */
    public delete_business_card_tags(document_id: string): Promise<any>;
/**
     * Update a business card. https://docs.veryfi.com/api/business-cards/update-a-business-card/
     */
    public update_business_card(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add a tag to a check. https://docs.veryfi.com/api/checks/add-a-tag-to-a-check/
     */
    public add_check_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a check. https://docs.veryfi.com/api/checks/add-tags-to-a-check/
     */
    public add_check_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Get tags assigned to a check. https://docs.veryfi.com/api/checks/get-check-tags/
     */
    public get_check_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/**
     * Unlink a tag from a check. https://docs.veryfi.com/api/checks/unlink-a-tag-from-a-check/
     */
    public delete_check_tag(document_id: string, tag_id: string): Promise<any>;
/**
     * Unlink all tags from a check. https://docs.veryfi.com/api/checks/unlink-all-tags-from-a-check/
     */
    public delete_check_tags(document_id: string): Promise<any>;
/**
     * Update a check. https://docs.veryfi.com/api/checks/update-a-check/
     */
    public update_check(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Process a check asynchronously. https://docs.veryfi.com/api/checks/process-a-check-asynchronously/
     */
    public process_check_async(file_path: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a check asynchronously from a file stream. https://docs.veryfi.com/api/checks/process-a-check-asynchronously/
     */
    public process_check_async_from_stream(file: stream.Readable, file_name: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a check asynchronously from a base64 string. https://docs.veryfi.com/api/checks/process-a-check-asynchronously/
     */
    public process_check_async_from_base64(file_name: string, file_base64_string: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a check asynchronously from a URL. https://docs.veryfi.com/api/checks/process-a-check-asynchronously/
     */
    public process_check_async_from_url(file_url?: string, file_urls?: string[], bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Process a check with remittance. https://docs.veryfi.com/api/checks/process-a-check-with-remittance/
     */
    public process_check_with_remittance(file_path: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a check with remittance from a file stream. https://docs.veryfi.com/api/checks/process-a-check-with-remittance/
     */
    public process_check_with_remittance_from_stream(file: stream.Readable, file_name: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a check with remittance from a base64 string. https://docs.veryfi.com/api/checks/process-a-check-with-remittance/
     */
    public process_check_with_remittance_from_base64(file_name: string, file_base64_string: string, bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a check with remittance from a URL. https://docs.veryfi.com/api/checks/process-a-check-with-remittance/
     */
    public process_check_with_remittance_from_url(file_url?: string, file_urls?: string[], bounding_boxes?: boolean, confidence_details?: boolean, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add a tag to a W-2. https://docs.veryfi.com/api/add-a-tag-to-a-w-2/
     */
    public add_w2_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a W-2. https://docs.veryfi.com/api/add-tags-to-a-w-2/
     */
    public add_w2_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Get tags assigned to a W-2. https://docs.veryfi.com/api/get-w-2-tags/
     */
    public get_w2_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/**
     * Unlink a tag from a W-2. https://docs.veryfi.com/api/unlink-a-tag-from-a-w-2/
     */
    public delete_w2_tag(document_id: string, tag_id: string): Promise<any>;
/**
     * Unlink all tags from a W-2. https://docs.veryfi.com/api/unlink-all-tags-from-a-w-2/
     */
    public delete_w2_tags(document_id: string): Promise<any>;
/**
     * Update a W-2. https://docs.veryfi.com/api/w2s/update-a-w-2/
     */
    public update_w2(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Split and process a PDF with multiple W-2s. https://docs.veryfi.com/api/split-and-process-a-pdf-with-multiple-w-2-s/
     */
    public split_w2s(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Split and process a PDF with multiple W-2s from a file stream. https://docs.veryfi.com/api/split-and-process-a-pdf-with-multiple-w-2-s/
     */
    public split_w2s_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Split and process a PDF with multiple W-2s from a base64 string. https://docs.veryfi.com/api/split-and-process-a-pdf-with-multiple-w-2-s/
     */
    public split_w2s_from_base64(file_name: string, file_base64_string: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Split and process a PDF with multiple W-2s from a URL. https://docs.veryfi.com/api/split-and-process-a-pdf-with-multiple-w-2-s/
     */
    public split_w2s_from_url(file_url?: string, file_urls?: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get W-2 sets. https://docs.veryfi.com/api/get-w-2-sets/
     */
    public get_w2_sets(page?: number, page_size?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get a W-2 set. https://docs.veryfi.com/api/get-a-w-2-set/
     */
    public get_w2_set(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add a tag to a W-8BEN-E. https://docs.veryfi.com/api/add-a-tag-to-a-w-8-ben-e/
     */
    public add_w8bene_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a W-8BEN-E. https://docs.veryfi.com/api/add-tags-to-a-w-8-ben-e/
     */
    public add_w8bene_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Get tags assigned to a W-8BEN-E. https://docs.veryfi.com/api/get-w-8-ben-e-tags/
     */
    public get_w8bene_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/**
     * Unlink a tag from a W-8BEN-E. https://docs.veryfi.com/api/unlink-a-tag-from-a-w-8-ben-e/
     */
    public delete_w8bene_tag(document_id: string, tag_id: string): Promise<any>;
/**
     * Unlink all tags from a W-8BEN-E. https://docs.veryfi.com/api/unlink-all-tags-from-a-w-8-ben-e/
     */
    public delete_w8bene_tags(document_id: string): Promise<any>;
/**
     * Update a W-8BEN-E. https://docs.veryfi.com/api/w-8ben-e/update-a-w-8-ben-e/
     */
    public update_w8bene(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add a tag to a W-9. https://docs.veryfi.com/api/add-a-tag-to-a-w-9/
     */
    public add_w9_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a W-9. https://docs.veryfi.com/api/add-tags-to-a-w-9/
     */
    public add_w9_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Get tags assigned to a W-9. https://docs.veryfi.com/api/get-w-9-tags/
     */
    public get_w9_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/**
     * Unlink a tag from a W-9. https://docs.veryfi.com/api/unlink-a-tag-from-a-w-9/
     */
    public delete_w9_tag(document_id: string, tag_id: string): Promise<any>;
/**
     * Unlink all tags from a W-9. https://docs.veryfi.com/api/unlink-all-tags-from-a-w-9/
     */
    public delete_w9_tags(document_id: string): Promise<any>;
/**
     * Update a W-9. https://docs.veryfi.com/api/w9s/update-a-w-9/
     */
    public update_w9(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Process a contract. https://docs.veryfi.com/api/contracts/process-a-contract/
     */
    public process_contract(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a contract from a file stream. https://docs.veryfi.com/api/contracts/process-a-contract/
     */
    public process_contract_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a contract from a base64 string. https://docs.veryfi.com/api/contracts/process-a-contract/
     */
    public process_contract_from_base64(file_name: string, file_base64_string: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a contract from a URL. https://docs.veryfi.com/api/contracts/process-a-contract/
     */
    public process_contract_from_url(file_url?: string, file_urls?: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get a contract. https://docs.veryfi.com/api/contracts/get-a-contract/
     */
    public get_contract(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get contracts. https://docs.veryfi.com/api/contracts/get-contracts/
     */
    public get_contracts(page?: number, page_size?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Update a contract. https://docs.veryfi.com/api/contracts/update-a-contract/
     */
    public update_contract(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Delete a contract. https://docs.veryfi.com/api/contracts/delete-a-contract/
     */
    public delete_contract(document_id: string): Promise<any>;
/**
     * Add a tag to a contract. https://docs.veryfi.com/api/add-a-tag-to-a-contract/
     */
    public add_contract_tag(document_id: string, tag: string): Promise<Tag>;
/**
     * Add tags to a contract. https://docs.veryfi.com/api/add-tags-to-a-contract/
     */
    public add_contract_tags(document_id: string, tags: string[]): Promise<Tag>;
/**
     * Get tags assigned to a contract. https://docs.veryfi.com/api/get-contract-tags/
     */
    public get_contract_tags(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<{tags: Tag[]}>;
/**
     * Unlink a tag from a contract. https://docs.veryfi.com/api/unlink-a-tag-from-a-contract/
     */
    public delete_contract_tag(document_id: string, tag_id: string): Promise<any>;
/**
     * Unlink all tags from a contract. https://docs.veryfi.com/api/unlink-all-tags-from-a-contract/
     */
    public delete_contract_tags(document_id: string): Promise<any>;
/**
     * Convert a document to markdown. https://docs.veryfi.com/api/parse/convert-a-document-to-markdown/
     */
    public process_markdown_document(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Convert a document to markdown from a file stream. https://docs.veryfi.com/api/parse/convert-a-document-to-markdown/
     */
    public process_markdown_document_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Convert a document to markdown from a base64 string. https://docs.veryfi.com/api/parse/convert-a-document-to-markdown/
     */
    public process_markdown_document_from_base64(file_name: string, file_base64_string: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Convert a document to markdown from a URL. https://docs.veryfi.com/api/parse/convert-a-document-to-markdown/
     */
    public process_markdown_document_from_url(file_url?: string, file_urls?: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Process a markdown document asynchronously. https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/
     */
    public process_markdown_document_async(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a markdown document asynchronously from a file stream. https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/
     */
    public process_markdown_document_async_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a markdown document asynchronously from a base64 string. https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/
     */
    public process_markdown_document_async_from_base64(file_name: string, file_base64_string: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a markdown document asynchronously from a URL. https://docs.veryfi.com/api/parse/process-a-markdown-document-asynchronously/
     */
    public process_markdown_document_async_from_url(file_url?: string, file_urls?: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Process a markdown document set. https://docs.veryfi.com/api/parse/process-a-markdown-document-set/
     */
    public process_markdown_document_set(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a markdown document set from a file stream. https://docs.veryfi.com/api/parse/process-a-markdown-document-set/
     */
    public process_markdown_document_set_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a markdown document set from a base64 string. https://docs.veryfi.com/api/parse/process-a-markdown-document-set/
     */
    public process_markdown_document_set_from_base64(file_name: string, file_base64_string: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Process a markdown document set from a URL. https://docs.veryfi.com/api/parse/process-a-markdown-document-set/
     */
    public process_markdown_document_set_from_url(file_url?: string, file_urls?: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get Markdown Documents. https://docs.veryfi.com/api/parse/get-markdown-documents/
     */
    public get_markdown_documents(page?: number, page_size?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get a Markdown Document. https://docs.veryfi.com/api/parse/get-a-markdown-document/
     */
    public get_markdown_document(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Update a Markdown Document. https://docs.veryfi.com/api/parse/update-a-markdown-document/
     */
    public update_markdown_document(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Delete a Markdown Document. https://docs.veryfi.com/api/parse/delete-a-markdown-document/
     */
    public delete_markdown_document(document_id: string): Promise<any>;
/**
     * Get Markdown Document Sets. https://docs.veryfi.com/api/parse/get-markdown-document-sets/
     */
    public get_markdown_document_sets(page?: number, page_size?: number, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get a Markdown Document Set. https://docs.veryfi.com/api/parse/get-a-markdown-document-set/
     */
    public get_markdown_document_set(document_id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Classify and possibly extract data from a document. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
     */
    public extract_document(file_path: string, document_types: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Classify and possibly extract data from a document from a file stream. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
     */
    public extract_document_from_stream(file: stream.Readable, file_name: string, document_types: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Classify and possibly extract data from a document from a base64 string. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
     */
    public extract_document_from_base64(file_name: string, file_base64_string: string, document_types: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /**
     * Classify and possibly extract data from a document from a URL. https://docs.veryfi.com/api/classify-and-possibly-extract-data-from-a-document/
     */
    public extract_document_from_url(file_url?: string, file_urls?: string[], document_types: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get devices from blocklist. https://docs.veryfi.com/api/get-devices-from-blocklist/
     */
    public get_fraud_blocklist({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Add devices to blocklist. https://docs.veryfi.com/api/add-devices-to-blocklist/
     */
    public add_devices_to_blocklist(device_ids: string[], {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Remove a device from blocklist. https://docs.veryfi.com/api/remove-a-device-from-blocklist/
     */
    public remove_device_from_blocklist(device_id: string): Promise<any>;
/**
     * Get ocr-counts. https://docs.veryfi.com/api/get-ocr-counts/
     */
    public get_ocr_counts(ocr_type?: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/**
     * Get OpenAPI schema. https://docs.veryfi.com/api/get-open-api-schema/
     */
    public get_open_api_schema({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Get release notifications. https://docs.veryfi.com/api/get-release-notifications/ */
    public get_release_notifications({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Retrieve api-keys list. https://docs.veryfi.com/api/settings/retrieve-api-keys-list/ */
    public get_api_keys({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Create api-key. https://docs.veryfi.com/api/settings/create-api-key/ */
    public create_api_key(name: any, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Retrieve api-key. https://docs.veryfi.com/api/settings/retrieve-api-key/ */
    public get_api_key(id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Update api-key. https://docs.veryfi.com/api/settings/update-api-key/ */
    public update_api_key(id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Revoke api-key. https://docs.veryfi.com/api/settings/revoke-api-key/ */
    public revoke_api_key(id: string): Promise<any>;
/** Rotate api-key. https://docs.veryfi.com/api/settings/rotate-api-key/ */
    public rotate_api_key(id: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Available permissions. https://docs.veryfi.com/api/settings/available-permissions/ */
    public get_api_key_permissions({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Verify the calling key. https://docs.veryfi.com/api/settings/verify-the-calling-key/ */
    public verify_api_key({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Retrieve client-keys list. https://docs.veryfi.com/api/settings/retrieve-client-keys-list/ */
    public get_client_keys({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Create client-keys. https://docs.veryfi.com/api/settings/create-client-keys/ */
    public create_client_keys({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Remove a client-key. https://docs.veryfi.com/api/settings/remove-a-client-key/ */
    public delete_client_key(id: string): Promise<any>;
/** Reset client-keys. https://docs.veryfi.com/api/settings/reset-client-keys/ */
    public reset_client_keys({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Get Tls Certificates. https://docs.veryfi.com/api/get-tls-certificates/ */
    public get_tls_certificates({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Process a Tls Certificate. https://docs.veryfi.com/api/process-a-tls-certificate/ */
    public process_tls_certificate({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Delete a Tls Certificate. https://docs.veryfi.com/api/delete-a-tls-certificate/ */
    public delete_tls_certificate(certificate_id: string): Promise<any>;
/** Get webhooks. https://docs.veryfi.com/api/settings/get-webhooks/ */
    public get_webhooks({...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Add a webhook. https://docs.veryfi.com/api/settings/add-a-webhook/ */
    public add_webhook(url: any, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Confirm a webhook. https://docs.veryfi.com/api/settings/confirm-a-webhook/ */
    public confirm_webhook(url: any, secret: any, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
/** Split and process a PDF. https://docs.veryfi.com/api/receipts-invoices/split-and-process-a-pdf/ */
    public split_document(file_path: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;
    /** Split and process a PDF from a file stream. */
    public split_document_from_stream(file: stream.Readable, file_name: string, {...kwargs}?: VeryfiExtraArgs): Promise<JsonObject>;

}

/**
 * Create instance of a Client
 * @class
 * @param {string} client_id Your Veryfi client id
 * @param {string | undefined} client_secret Your Veryfi client secret
 * @param {string} username Your Veryfi username
 * @param {string} api_key Your Veryfi API key
 * @param {string} base_url
 * @param {number} timeout
 */
export declare function Client(
    client_id: string,
    client_secret: string | undefined,
    username: string,
    api_key: string,
    base_url?: string,
    timeout?: number
): Client;

export default Client;
