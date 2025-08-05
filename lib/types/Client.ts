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
     * @returns {JSON} A JSON of the response data.
     */
    public _request(http_verb: String, endpoint_name: String, request_arguments: Object, params: Object, has_files: boolean): Promise<any>;

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
