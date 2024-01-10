import fs from "fs";

/**
 * Additional request parameters type
 */
export declare type VeryfiExtraArgs = Record<
    string | number | symbol,
    string | number | boolean
>;

export declare type BoundingElement = {
  bounding_box?: null | number[];
  bounding_region?: null | number[];
  rotation?: null | number;
  value?: null | number | string;
}

/**
 * Object of data extracted from the document
 */
export declare type VeryfiDocument = {
  abn_number?: null | string | BoundingElement;
  account_number?: null | string | BoundingElement;
  accounting_entry_type?: null | string;
  balance?: null | string | BoundingElement;
  barcodes?: null | string[] | BoundingElement[];
  bill_to?: null | BillTo;
  card_number?: null | string | BoundingElement;
  cashback?: null | number | BoundingElement;
  category?: null | string | BoundingElement;
  created_date?: null | string;
  currency_code?: null | string | BoundingElement;
  custom_fields?: null | VeryfiExtraArgs;
  date?: null | string | BoundingElement;
  default_category?: null | string | BoundingElement;
  delivery_date?: null | string | BoundingElement;
  delivery_note_number?: null | string | BoundingElement;
  discount?: null | number | BoundingElement;
  document_reference_number?: null | string | BoundingElement;
  document_title?: null | string | BoundingElement;
  document_type?: null | string | BoundingElement;
  due_date?: null | string | BoundingElement;
  duplicate_of?: null | number;
  exch_rate?: null | number;
  external_id?: null | string;
  final_balance?: null | number | BoundingElement;
  guest_count?: null | number | BoundingElement;
  id?: null | number;
  img_blur?: null | boolean;
  img_file_name?: null | string;
  img_thumbnail_url?: null | string;
  img_url?: null | string;
  incoterms?: null | number | BoundingElement;
  insurance?: null | number | BoundingElement;
  invoice_number?: null | string | BoundingElement;
  is_approved?: null | boolean;
  is_blurry?: null | boolean[];
  is_document?: null | boolean;
  is_duplicate?: null | boolean;
  is_money_in?: null | boolean | BoundingElement;
  license_plate_number?: null | string | BoundingElement;
  line_items?: null | LineItem[];
  line_items_with_scores?: null | LineItem[];
  notes?: null | string;
  ocr_text?: null | string;
  order_date?: null | string | BoundingElement;
  payment?: null | Payment;
  pdf_url?: null | string;
  previous_balance?: null | number | BoundingElement;
  purchase_order_number?: null | string | BoundingElement;
  rounding?: null | number | BoundingElement;
  server_name?: null | string | BoundingElement;
  service_end_date?: null | string;
  service_start_date?: null | string;
  ship_date?: null | string | BoundingElement;
  ship_to?: null | ShipTo;
  shipping?: null | number | BoundingElement;
  status?: null | string;
  store_number?: null | string | BoundingElement;
  subtotal?: null | number | BoundingElement;
  tags?: null | Tag[];
  tax?: null | number | BoundingElement;
  tax_lines?: null | TaxLine[];
  tip?: null | number | BoundingElement;
  total?: null | number | BoundingElement;
  total_pages?: null | number;
  total_quantity?: null | string | BoundingElement;
  total_weight?: null | string | BoundingElement;
  tracking_number?: null | string | BoundingElement;
  tracking_numbers?: null | BoundingElement[];
  updated_date?: null | string;
  vending_person?: null | string | BoundingElement;
  vending_person_number?: null | string | BoundingElement;
  vat_number?: null | string;
  vendor?: null | Vendor;
  vendors?: null | BoundingElement[];
  vin_number?: null | string | BoundingElement;
  warnings?: null | string[];
  weights?: null | BoundingElement[];
};

declare type LineItem = {
  date?: null | string | BoundingElement;
  description?: null | string | BoundingElement;
  discount?: null | number | BoundingElement;
  end_date?: null | string | BoundingElement;
  hsn?: null | string;
  id?: null | number;
  order?: null | number;
  price?: null | number | BoundingElement;
  quantity?: null | number | BoundingElement;
  reference?: null | string | BoundingElement;
  section?: null | string;
  sku?: null | string | BoundingElement;
  start_date?: null | string;
  tags?: null | null[];
  tax?: null | number| BoundingElement;
  tax_rate?: null | number;
  total?: null | number | BoundingElement;
  type?: null | string;
  unit_of_measure?: null | string;
};

declare type TaxLine = {
  base?: null | number | BoundingElement;
  name?: null | string | BoundingElement;
  order?: null | number;
  rate?: null | number | BoundingElement;
  total?: null | number | BoundingElement;
};

declare type Vendor = {
  address?: null | string | BoundingElement;
  category?: null | string | BoundingElement;
  email?: null | string | BoundingElement;
  fax_number?: null | string | BoundingElement;
  name?: null | string | BoundingElement;
  phone_number?: null | string | BoundingElement;
  raw_name?: null | string;
  vendor_logo?: null | string | BoundingElement;
  vendor_reg_number?: null | string | BoundingElement;
  vendor_type?: null | string;
  web?: null | string | BoundingElement;
};

declare type Payment = {
  card_number?: null | string | BoundingElement;
  display_name?: null | string | BoundingElement;
  terms?: null | number | BoundingElement;
  type?: null | string;
};

declare type Tag = {
  id?: null | number;
  name?: null | string;
};

declare type BillTo = {
  address?: null | string | BoundingElement;
  email?: null | string | BoundingElement;
  name?: null | string | BoundingElement;
  parsed_address?: null | string;
  phone_number?: null | number | string | BoundingElement;
  reg_number?: null | number | string | BoundingElement;
  vat_number?: null | number | string | BoundingElement;
};

declare type ShipTo = {
  address?: null | string | BoundingElement;
  name?: null | string | BoundingElement;
  parsed_address?: null | string;
};

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
   * Get all documents
   * @memberof Client
   * @returns {Promise<VeryfiDocument>} Object of previously processed documents
   */
  public get_documents(): Promise<VeryfiDocument[]>;

  /**
   * Retrieve document by ID
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to retrieve
   * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
   */
  public get_document(document_id: string): Promise<VeryfiDocument>;

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
      { ...kwargs }?: VeryfiExtraArgs
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
      { ...kwargs }?: VeryfiExtraArgs
  ): Promise<VeryfiDocument>;

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
      { ...kwargs }?: VeryfiExtraArgs
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
      { ...kwargs }?: VeryfiExtraArgs
  ): Promise<VeryfiDocument>;

  /**
   * Delete document from Veryfi
   * @memberof Client
   * @param {string} document_id ID of the document you'd like to delete
   * @returns {Promise<VeryfiDocument>} Object of data extracted from the document
   */
  public delete_document(document_id: string): Promise<any>;

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
      { ...kwargs }?: VeryfiExtraArgs
  ): Promise<VeryfiDocument>;

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
