import fs from "fs";
import {VeryfiDocument} from "./VeryfiDocument";
import {JsonObject, VeryfiExtraArgs} from "./VeryfiExtraArgs";
import {Tag} from "./Tag";

export declare class Client {
  /**
   * Create instance of a Client
   * @class
   * @param {string} client_id Your Veryfi client id
   * @param {string | undefined} client_secret Your Veryfi client secret
   * @param {string} username Your Veryfi username
   * @param {string} api_key Your Veryfi API key
   * @param {string} base_url
   * @param {string} api_version
   * @param {number} timeout
   */
  constructor(
      client_id: string,
      client_secret: string | undefined,
      username: string,
      api_key: string,
      base_url?: string,
      api_version?: string,
      timeout?: number
  );
  client_id: string;
  client_secret: string | undefined;
  username: string;
  api_key: string;
  base_url: string;
  api_version: string;
  CATEGORIES: string[];
  private _get_headers;
  private _get_url;
  private _generate_signature;
  private _request;

  /**
   * Delete document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
   */
  public delete_document(document_id: string): Promise<any>;

  /**
   * Retrieve document by ID
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to retrieve
   * @param {Object} kwargs Additional request parameters
   * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
   */
  public get_document(document_id: string,  {...kwargs}?: VeryfiExtraArgs): Promise<VeryfiDocument>;

  /**
   * Get all documents
   * @memberof Client
   * @returns {Promise<VeryfiDocument>} Object of previously processed documents
   */
  public get_documents(
      page?: number,
      page_size?: number,
      bounding_boxes?: boolean,
      confidence_details?: boolean
  ): Promise<VeryfiDocument[]>;

  /**
   * Process a document and extract all the fields from it
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
   * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
   * @param {VeryfiExtraArgs} kwargs Additional request parameters
   * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
   */
  public process_document(
      file_path: string,
      categories?: string[],
      delete_after_processing?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<VeryfiDocument>;

  /**
   * Process a document and extract all the fields from it
   * @example
   * veryfi_client.process_document_buffer_string('base64_encoded_string',
   *                                'receipt.png',
   *                                ['Entertainment','Food'],
   *                                true,
   *                                {'extra': 'parameters'})
   *
   * @memberof Client
   * @param {String} base64_encoded_string Buffer string of a file to submit for data extraction
   * @param {String} file_name The file name including the extension
   * @param {Array} categories List of categories Veryfi can use to categorize the document
   * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_document_base64string(
      base64_encoded_string: string,
      file_name: string,
      categories?: string[],
      delete_after_processing?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<VeryfiDocument>;

  /**
   * Process a document and extract all the fields from it
   * @example
   * veryfi_client.process_document_buffer('buffer',
   *                                'receipt.png',
   *                                ['Entertainment','Food'],
   *                                true,
   *                                {'extra': 'parameters'})
   *
   * @memberof Client
   * @param {ReadStream} file ReadStream of a file to submit for data extraction
   * @param {String} file_name The file name including the extension
   * @param {Array} categories List of categories Veryfi can use to categorize the document
   * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_document_stream(
      file: fs.ReadStream,
      file_name: string,
      categories?: string[],
      delete_after_processing?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<VeryfiDocument>;

  /**
   * Process document from url and extract all the fields from it.
   * @memberof Client
   * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. 'https://cdn.example.com/receipt.jpg'.
   * @param {string[]} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ['https://cdn.example.com/receipt1.jpg', 'https://cdn.example.com/receipt2.jpg']
   * @param {string[]} categories List of categories to use when categorizing the document
   * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
   * @param {number} boost_mode Flag that tells Veryfi whether boost mode should be enabled. When set to 1, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is 0
   * @param {string} external_id Optional custom document identifier. Use this if you would like to assign your own ID to documents
   * @param {number} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
   * @param {VeryfiExtraArgs} kwargs Additional request parameters
   * @return {Promise<VeryfiDocument>} Object of data extracted from the document
   */
  public process_document_url(
      file_url?: string,
      file_urls?: string[],
      categories?: string[],
      delete_after_processing?: boolean,
      boost_mode?: number,
      external_id?: string,
      max_pages_to_process?: number,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<VeryfiDocument>;

  /**
   * Update data for a previously processed document, including almost any field like `vendor`, `date`, `notes` etc.
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
   * Delete any document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<any>} Object of data extracted from the document
   */
  public delete_any_document(document_id: string): Promise<any>;

  /**
   * Get a specific any document
   * @memberof Client
   * @param {number} document_id The unique identifier of the document.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
   */
  public get_any_document(document_id: number,
                          bounding_boxes?: boolean,
                          confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Get all any documents
   * @memberof Client
   * @param {number} page The page number. The response is capped to maximum of 50 results per page.
   * @param {number} page_size The number of Documents per page.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of previously processed any documents
   */
  public get_any_documents(page?: number,
                           page_size?: number,
                           bounding_boxes?: boolean,
                           confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Process any document and extract all the fields from it
   * @example
   * veryfi_client.process_any_document('file/path','template_name')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {String} template_name name of the extraction templates.
   * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_any_document(
      file_path: string,
      template_name?: string,
      max_pages_to_process?: number,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process any document and extract all the fields from it. https://docs.veryfi.com/api/anydocs/process-%E2%88%80-doc/
   *
   * @memberof Client
   * @param {String} file_name The file name including the extension
   * @param {String} file_buffer Buffer of a file to submit for data extraction
   * @param {String} template_name name of the extraction templates.
   * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_any_document_from_buffer(
      file_name: string,
      file_buffer: string,
      template_name?: string,
      max_pages_to_process?: number,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process any document and extract all the fields from it
   * @example
   * veryfi_client.process_any_document_url('file_url','template_name')
   *
   * @memberof Client
   * @param {String} file_url url file to submit for data extraction
   * @param {String} template_name name of the extraction templates.
   * @param {number} max_pages_to_process The number of pages to process for the document. The limit is 50 pages per document.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_any_document_url(
      file_url: string,
      template_name?: string,
      max_pages_to_process?: number,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Delete bank statement document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<any>} Object of data extracted from the document
   */
  public delete_bank_statement(document_id: string): Promise<any>;

  /**
   * Get a specific bank statement
   * @memberof Client
   * @param {number} document_id The unique identifier of the document.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
   */
  public get_bank_statement(document_id: number, bounding_boxes?: boolean,
                            confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Get all bank statements
   * @memberof Client
   * @param {number} page The page number. The response is capped to maximum of 50 results per page.
   * @param {number} page_size The number of Documents per page.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of previously processed any documents
   */
  public get_bank_statements(
      page?: number,
      page_size?: number,
      bounding_boxes?: boolean,
      confidence_details?: boolean
  ): Promise<JsonObject[]>;

  /**
   * Process bank statement and extract all the fields from it
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
   * Process bank statement and extract all the fields from it
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
  public process_bank_statement_from_buffer(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process bank statement document and extract all the fields from it
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
  public process_bank_statement_url(
      file_url: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Delete business card document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<any>} Object of data extracted from the document
   */
  public delete_business_card(document_id: string): Promise<any>;

  /**
   * Get a specific business card
   * @memberof Client
   * @param {number} document_id The unique identifier of the document.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
   */
  public get_business_card(document_id: number, bounding_boxes?: boolean,
                           confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Get all business cards
   * @memberof Client
   * @param {number} page The page number. The response is capped to maximum of 50 results per page.
   * @param {number} page_size The number of Documents per page.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of previously processed any documents
   */
  public get_business_cards(
      page?: number,
      page_size?: number,
      bounding_boxes?: boolean,
      confidence_details?: boolean
  ): Promise<JsonObject[]>;

  /**
   * Process business card and extract all the fields from it
   * @example
   * veryfi_client.process_business_card('file/path')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_business_card(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process business card and extract all the fields from it
   * @example
   * veryfi_client.process_business_card_from_buffer('file/path')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_business_card_from_buffer(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process business card document and extract all the fields from it
   * @example
   * veryfi_client.process_business_card_url('file_url')
   *
   * @memberof Client
   * @param {String} file_url url file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_business_card_url(
      file_url: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;


  /**
   * Delete a check document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<any>} Object of data extracted from the document
   */
  public delete_check(document_id: string): Promise<any>;

  /**
   * Get a specific check
   * @memberof Client
   * @param {number} document_id The unique identifier of the document.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
   */
  public get_check(document_id: number, bounding_boxes?: boolean,
                   confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Get all checks
   * @memberof Client
   * @param {number} page The page number. The response is capped to maximum of 50 results per page.
   * @param {number} page_size The number of Documents per page.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of previously processed any documents
   */
  public get_checks(
      page?: number,
      page_size?: number,
      bounding_boxes?: boolean,
      confidence_details?: boolean
  ): Promise<JsonObject[]>;

  /**
   * Process check and extract all the fields from it
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
   * Process check and extract all the fields from it
   * @example
   * veryfi_client.process_check_from_buffer('file/path')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_check_from_buffer(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process a check document and extract all the fields from it
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
  public process_check_url(
      file_url: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Delete w2 document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<any>} Object of data extracted from the document
   */
  public delete_w2(document_id: string): Promise<any>;

  /**
   * Get a specific w2
   * @memberof Client
   * @param {number} document_id The unique identifier of the document.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
   */
  public get_w2(document_id: number, bounding_boxes?: boolean,
                confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Get all w2s
   * @memberof Client
   * @param {number} page The page number. The response is capped to maximum of 50 results per page.
   * @param {number} page_size The number of Documents per page.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of previously processed any documents
   */
  public get_w2s(
      page?: number,
      page_size?: number,
      bounding_boxes?: boolean,
      confidence_details?: boolean
  ): Promise<JsonObject[]>;

  /**
   * Process w2 and extract all the fields from it
   * @example
   * veryfi_client.process_w2('file/path')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_w2(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process w2 and extract all the fields from it
   * @example
   * veryfi_client.process_w2_from_buffer('file/path')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_w2_from_buffer(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process w2 document and extract all the fields from it
   * @example
   * veryfi_client.process_w2_url('file_url')
   *
   * @memberof Client
   * @param {String} file_url url file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_w2_url(
      file_url: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;


  /**
   * Delete  W-8BEN-E document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<any>} Object of data extracted from the document
   */
  public delete_w8bene(document_id: string): Promise<any>;

  /**
   * Get a specific  W-8BEN-E
   * @memberof Client
   * @param {number} document_id The unique identifier of the document.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
   */
  public get_w8bene(document_id: number, bounding_boxes?: boolean,
                    confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Get all W-8BEN-E forms
   * @memberof Client
   * @param {number} page The page number. The response is capped to maximum of 50 results per page.
   * @param {number} page_size The number of Documents per page.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of previously processed any documents
   */
  public get_w8benes(
      page?: number,
      page_size?: number,
      bounding_boxes?: boolean,
      confidence_details?: boolean
  ): Promise<JsonObject[]>;

  /**
   * Process W-8BEN-E and extract all the fields from it
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
   * Process W-8BEN-E and extract all the fields from it
   * @example
   * veryfi_client.process_w8bene_from_buffer('file/path')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_w8bene_from_buffer(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process W-8BEN-E document and extract all the fields from it
   * @example
   * veryfi_client.process_w8bene_url('file_url')
   *
   * @memberof Client
   * @param {String} file_url url file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_w8bene_url(
      file_url: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;


  /**
   * Delete W9 document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<any>} Object of data extracted from the document
   */
  public delete_w9(document_id: string): Promise<any>;

  /**
   * Get a specific w9
   * @memberof Client
   * @param {number} document_id The unique identifier of the document.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of a previously processed blueprinted document.
   */
  public get_w9(document_id: number, bounding_boxes?: boolean,
                confidence_details?: boolean): Promise<JsonObject[]>;

  /**
   * Get all w9s
   * @memberof Client
   * @param {number} page The page number. The response is capped to maximum of 50 results per page.
   * @param {number} page_size The number of Documents per page.
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @returns {Promise<JsonObject>} Object of previously processed any documents
   */
  public get_w9s(
      page?: number,
      page_size?: number,
      bounding_boxes?: boolean,
      confidence_details?: boolean
  ): Promise<JsonObject[]>;

  /**
   * Process w9 and extract all the fields from it
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
   * Process w9 and extract all the fields from it
   * @example
   * veryfi_client.process_w9_from_buffer('file/path')
   *
   * @memberof Client
   * @param {String} file_path Path on disk to a file to submit for data extraction
   * @param {boolean} bounding_boxes A field used to determine whether to return bounding_box and bounding_region for extracted fields in the Document response.
   * @param {boolean} confidence_details A field used to determine whether to return the score and ocr_score fields in the Document response.
   * @param {Object} kwargs Additional request parameters
   * @returns {JSON} Data extracted from the document
   */
  public process_w9_from_buffer(
      file_path: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;

  /**
   * Process w9 document and extract all the fields from it
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
  public process_w9_url(
      file_url: string,
      bounding_boxes?: boolean,
      confidence_details?: boolean,
      {...kwargs}?: VeryfiExtraArgs
  ): Promise<JsonObject>;


  /**
   * Add a new tag on an existing document
   *
   * @param {number} document_id ID of the document you'd like to add a Tag
   * @param {string} tag name to add
   * @return {Promise<Tag>} response about tag added.
   */
  public add_tag(document_id: string, tag: string): Promise<Tag>;

  /**
   * Delete all tags on an existing document
   *
   * @param {number} document_id ID of the document you'd like to delete all Tags
   * @return {Promise<any>} response about deleted tags.
   */
  public delete_tags(document_id: string): Promise<any>;

  /**
   * Add multiple tags on an existing document
   *
   * @param {number} document_id ID of the document you'd like to add a Tag
   * @param {string[]} tags name to add
   * @return {Promise<Tag>} response about tags added.
   */
  public add_tags(document_id: string, tags: string[]): Promise<Tag>;

  /**
   * Replace multiple tags on an existing document
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
 * @param {string} api_version
 * @param {number} timeout
 */
export declare function Client(
    client_id: string,
    client_secret: string | undefined,
    username: string,
    api_key: string,
    base_url?: string,
    api_version?: string,
    timeout?: number
): Client;

export default Client;
