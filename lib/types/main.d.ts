/**
 * Additional request parameters type
 */
export declare type VeryfiExtraArgs = Record<
  string | number | symbol,
  string | number | boolean
>;

/**
 * Object of data extracted from the document
 */
export declare type VeryfiDocument = {
  abn_number?: null | string;
  account_number?: null | string;
  bill_to_address?: null | string;
  bill_to_name?: null | string;
  bill_to_vat_number?: null | string;
  card_number?: null | string;
  cashback?: null | number;
  category?: null | string;
  created?: null | string;
  currency_code?: null | string;
  date?: null | string;
  delivery_date?: null | string;
  discount?: null | number;
  document_reference_number?: null | string;
  document_title?: null | string;
  document_type?: null | string;
  due_date?: null | string;
  duplicate_of?: null | number;
  external_id?: null | string;
  id?: null | number;
  img_file_name?: null | string;
  img_thumbnail_url?: null | string;
  img_url?: null | string;
  insurance?: null | number;
  invoice_number?: null | string;
  is_duplicate?: null | number;
  line_items?: null | LineItem[];
  notes?: null | string;
  ocr_text?: null | string;
  order_date?: null | string;
  payment?: null | Payment;
  payment_display_name?: null | string;
  payment_terms?: null | string;
  payment_type?: null | string;
  phone_number?: null | string;
  purchase_order_number?: null | string;
  rounding?: null | number;
  service_end_date?: null | string;
  service_start_date?: null | string;
  ship_date?: null | string;
  ship_to_address?: null | string;
  ship_to_name?: null | string;
  shipping?: null | number;
  store_number?: null | string;
  subtotal?: null | number;
  tax?: null | number;
  tax_lines?: null | TaxLine[];
  tip?: null | number;
  total?: null | number;
  total_weight?: null | string;
  tracking_number?: null | string;
  updated?: null | string;
  vat_number?: null | string;
  vendor?: null | Vendor;
  vendor_account_number?: null | string;
  vendor_bank_name?: null | string;
  vendor_bank_number?: null | string;
  vendor_bank_swift?: null | string;
  vendor_iban?: null | string;
};

declare type LineItem = {
  date?: null | string;
  description?: null | string;
  discount?: null | number;
  end_date?: null | string;
  hsn?: null | string;
  id?: null | number;
  order?: null | number;
  price?: null | number;
  quantity?: null | number;
  reference?: null | string;
  section?: null | string;
  sku?: null | string;
  start_date?: null | string;
  tags?: null | null[];
  tax?: null | number;
  tax_rate?: null | number;
  total?: null | number;
  type?: null | string;
  unit_of_measure?: null | string;
};

declare type TaxLine = {
  base?: null | number;
  name?: null | string;
  order?: null | number;
  rate?: null | number;
  total?: null | number;
};

declare type Vendor = {
  address?: null | string;
  category?: null | string;
  email?: null | string;
  fax_number?: null | string;
  name?: null | string;
  phone_number?: null | string;
  raw_name?: null | string;
  vendor_logo?: null | string;
  vendor_reg_number?: null | string;
  vendor_type?: null | string;
  web?: null | string;
};

declare type Payment = {
  card_number?: null | string;
  display_name?: null | string;
  terms?: null | number;
  type?: null | string;
};

export declare class Client {
  /**
   * Create instance of a Client
   * @class
   * @param {string} client_id Your Veryfi client id
   * @param {string} client_secret Your Veryfi client secret
   * @param {string} username Your Veryfi username
   * @param {string} api_key Your Veryfi API key
   * @param {string} base_url
   * @param {string} api_version
   * @param {number} timeout
   */
  constructor(
    client_id: string,
    client_secret: string,
    username: string,
    api_key: string,
    base_url?: string,
    api_version?: string,
    timeout?: number
  );

  client_id: string;

  client_secret: string;

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
  public delete_document(document_id: string): Promise<VeryfiDocument>;

  /**
   * Update data for a previously processed document, including almost any field like `vendor`, `date`, `notes` and etc.
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
}

/**
 * Create instance of a Client
 * @class
 * @param {string} client_id Your Veryfi client id
 * @param {string} client_secret Your Veryfi client secret
 * @param {string} username Your Veryfi username
 * @param {string} api_key Your Veryfi API key
 * @param {string} base_url
 * @param {string} api_version
 * @param {number} timeout
 */
export declare function Client(
  client_id: string,
  client_secret: string,
  username: string,
  api_key: string,
  base_url?: string,
  api_version?: string,
  timeout?: number
): Client;

export default Client;
