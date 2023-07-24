import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import {
    DEFAULT_API_VERSION,
    DEFAULT_BASE_URL,
    DEFAULT_CATEGORIES,
} from './constants';

import type { VeryfiDocument } from './types';

/**
 * Create instance of a Client
 * @class
 * @param {string} client_id Your Veryfi client id
 * @param {string} client_secret Your Veryfi client secret
 * @param {string} username Your Veryfi username
 * @param {string} api_key Your Veryfi API key
 * @param {string} base_url
 * @param {string} api_version
 * @param {Number} timeout
 */
export default class Client {
    constructor(
        private readonly client_id: string,
        private readonly client_secret: string,
        private readonly username: string,
        private readonly api_key: string,
        private readonly base_url = DEFAULT_BASE_URL,
        // TODO: change to enum
        private readonly api_version = DEFAULT_API_VERSION,
        private readonly timeout = 120,
    ) {}

    /**
     * Check api version for w2 documents
     * @private
     * @throws if api_version is different to v8
     */
    private check_w2_version() {
        // TODO: change to enum
        if (this.api_version !== 'v8')
            throw Error('w2 is only supported on v8');
    }

    /**
     * Prepares the headers needed for a request.
     * @private
     * @param {Boolean} has_files Are there any files to be submitted as binary
     * @return {Object} Dictionary with headers
     */
    private get_headers(has_files = false) {
        const headers = {
            Accept: 'application/json',
            'Client-Id': this.client_id,
            'Content-Type': 'application/json',
            'User-Agent': 'Node.js Veryfi-Nodejs/1.2.0',
            Authorization: `apikey ${this.username}:${this.api_key}`,
        };

        if (has_files) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        return headers;
    }

    /**
     * Get API Base URL with API Version
     * @private
     * @returns {string} Base URL to Veryfi API
     */
    private get url() {
        return this.base_url + 'api/' + this.api_version;
    }

    /**
     * Generate unique signature for payload params.
     * @private
     * @param {{}} payload_params JSON params to be sent to API request
     * @param {Number} timestamp Unix Long timestamp
     * @returns {string} Unique signature generated using the client_secret and the payload
     */
    private generate_signature(
        payload_params: Record<string, string>,
        timestamp,
    ) {
        let payload = `timestamp:${timestamp}`;

        for (const key in payload_params)
            payload += `,${key}:${payload_params[key]}`;

        // TODO: refactor it
        const secret_bytes = encodeURI(this.client_secret);
        const payload_bytes = encodeURI(payload);
        const hmac = crypto.createHmac('sha256', secret_bytes);

        hmac.update(payload_bytes);

        const tmp_signature = hmac.digest();
        let base64_signature = Buffer.from(tmp_signature).toString('base64');

        base64_signature = Buffer.from(base64_signature)
            .toString('utf-8')
            .trim();

        return base64_signature;
    }

    /**
     * Submit the HTTP request.
     * @private
     * @param {string} http_verb HTTP Method
     * @param {string} endpoint_name Endpoint name such as 'documents', 'users', etc.
     * @param {{}} request_arguments JSON payload to send to Veryfi
     * @param params {{}} query params.
     * @param file_stream file stream of the document
     * @returns {JSON} A JSON of the response data.
     */
    async request<T = unknown, R extends AxiosResponse<T> = AxiosResponse<T>>(
        http_verb: AxiosRequestConfig['method'],
        endpoint_name: AxiosRequestConfig['url'],
        request_arguments = {},
        params = {},
        file_stream = null,
    ): Promise<T> {
        const has_files = Boolean(file_stream);
        const headers = this.get_headers(has_files);
        const api_url = `${this.url}/partner${endpoint_name}`;

        if (this.client_secret) {
            const timestamp = Date.now();
            const signature = this.generate_signature(
                request_arguments,
                timestamp,
            );

            Object.assign(headers, {
                'X-Veryfi-Request-Timestamp': timestamp,
                'X-Veryfi-Request-Signature': signature,
            });
        }

        if (!has_files) request_arguments = JSON.stringify(request_arguments);
        else Object.assign(headers, request_arguments);

        return axios
            .request<T, R>({
                method: http_verb,
                url: api_url,
                headers: headers,
                data: request_arguments,
                timeout: this.timeout * 1000,
                params: params,
            })
            .then(({ data }) => data)
            .catch((response: AxiosError) => {
                const error = response?.response;
                if (error) {
                    // TODO: fix error handling
                    const errorStatus = error?.status ?? 500;
                    const errorInfo =
                        (error?.data as { error: string })?.error ||
                        error?.statusText ||
                        'Unknown error';
    
                    throw new Error(`${errorStatus} ${errorInfo}`);
                } else {
                    throw new Error(response.message);
                }
            });
    }

    /**
     * Process a w2 document from an url.
     * @memberOf Client
     * @param {String} file_name The file name including the extension
     * @memberof Client
     * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
     * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
     * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @return {JSON} Data extracted from the document.
     */
    async process_w2_document_from_url(
        file_name: string,
        file_url: string,
        file_urls = null,
        delete_after_processing = false,
        max_pages_to_process = 1,
        kwargs = {},
    ) {
        this.check_w2_version();

        const endpoint_name = '/w2s/';
        const request_arguments = {
            file_url,
            file_name,
            auto_delete: delete_after_processing,
            file_urls: file_urls,
            max_pages_to_process: max_pages_to_process,
            ...kwargs,
        };

        return this.request<VeryfiDocument>(
            'POST',
            endpoint_name,
            request_arguments,
        );
    }

    /**
     * Get JSON of documents
     * @memberof Client
     * @returns {JSON} JSON object of previously processed documents
     */
    get_documents() {
        return this.request<{ documents: VeryfiDocument[] }>(
            'GET',
            '/documents/',
        );
    }

    /**
     * Retrieve document by ID
     * @memberof Client
     * @param {string} id ID of the document you'd like to retrieve
     * @returns {JSON} Data extracted from the Document
     */
    get_document(id: string | number) {
        return this.request<VeryfiDocument>('GET', `/documents/${id}/`, { id });
    }

    /**
     * Process a document and extract all the fields from it
     * @example
     * veryfi_client.process_document('file/path',
     *                                ['Entertainment','Food'],
     *                                true,
     *                                {"extra":"parameters"})
     *
     * @memberof Client
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {Array} categories List of categories Veryfi can use to categorize the document
     * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    process_document(
        file_path: string,
        categories = null,
        delete_after_processing = false,
        kwargs = {},
    ) {
        const endpoint_name = '/documents/';
        const file_name = path.basename(file_path);
        const image_file = fs.readFileSync(file_path, { encoding: 'base64' });
        const base64_encoded_string = Buffer.from(image_file).toString('utf-8');
        const request_arguments = {
            file_name: file_name,
            file_data: base64_encoded_string,
            categories: categories || DEFAULT_CATEGORIES,
            auto_delete: delete_after_processing,
            ...kwargs,
        };

        return this.request<VeryfiDocument>(
            'POST',
            endpoint_name,
            request_arguments,
        );
    }

    /**
     * Process a document and extract all the fields from it
     * @example
     * veryfi_client.process_document_buffer('base64_encoded_string',
     *                                'receipt.png',
     *                                ['Entertainment','Food'],
     *                                true,
     *                                {'extra': 'parameters'})
     *
     * @memberof Client
     * @param {String} base64_encoded_string Buffer of a file to submit for data extraction
     * @param {String} file_name The file name including the extension
     * @param {Array} categories List of categories Veryfi can use to categorize the document
     * @param {Boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
     * @param {Object} kwargs Additional request parameters
     * @returns {JSON} Data extracted from the document
     */
    process_document_buffer(
        base64_encoded_string: string,
        file_name: string,
        categories = null,
        delete_after_processing = false,
        kwargs = {},
    ) {
        const endpoint_name = '/documents/';
        const request_arguments = {
            file_name,
            file_data: base64_encoded_string,
            categories: categories || DEFAULT_CATEGORIES,
            auto_delete: delete_after_processing,
            ...kwargs,
        };

        return this.request<VeryfiDocument>(
            'POST',
            endpoint_name,
            request_arguments,
        );
    }

    /**
     * Process document from url and extract all the fields from it.
     * @example
     * veryfi_client.process_document_url('https://cdn.example.com/receipt.jpg')
     *
     * @memberof Client
     * @param {string} file_url Required if file_urls isn't specified. Publicly accessible URL to a file, e.g. "https://cdn.example.com/receipt.jpg".
     * @param {Array} file_urls Required if file_url isn't specified. List of publicly accessible URLs to multiple files, e.g. ["https://cdn.example.com/receipt1.jpg", "https://cdn.example.com/receipt2.jpg"]
     * @param {Array} categories List of categories to use when categorizing the document
     * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
     * @param {int} boost_mode Flag that tells Veryfi whether boost mode should be enabled. When set to 1, Veryfi will skip data enrichment steps, but will process the document faster. Default value for this flag is 0
     * @param {string} external_id Optional custom document identifier. Use this if you would like to assign your own ID to documents
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @return {JSON} Data extracted from the document.
     */
    process_document_url(
        file_url = '',
        file_urls = null,
        categories = null,
        delete_after_processing = false,
        boost_mode = 0,
        external_id = '',
        max_pages_to_process = 1,
        kwargs = {},
    ) {
        const endpoint_name = '/documents/';
        const request_arguments = {
            auto_delete: delete_after_processing,
            boost_mode: boost_mode,
            categories: categories || DEFAULT_CATEGORIES,
            external_id: external_id,
            file_url: file_url,
            file_urls: file_urls,
            max_pages_to_process: max_pages_to_process,
            ...kwargs,
        };

        return this.request<VeryfiDocument>(
            'POST',
            endpoint_name,
            request_arguments,
        );
    }

    /**
     * Delete document from Veryfi
     *
     * @memberof Client
     * @param {string} id ID of the document you'd like to delete
     */
    delete_document(id: string) {
        return this.request('DELETE', `/documents/${id}/`, { id });
    }

    /**
     * Update data for a previously processed document, including almost any field like `vendor`, `date`, `notes` and etc.
     * @example
     * veryfi_client.update_document(id, {date:"2021-01-01", notes:"look what I did"})
     *
     * @memberof Client
     * @param {string} id ID of the document you'd like to update
     * @param {Object} kwargs fields to update
     * @return {JSON} A document json with updated fields, if fields are writable. Otherwise, a document with unchanged fields.
     */
    update_document(id, kwargs = {}) {
        return this.request('PUT', `/documents/${id}/`, kwargs);
    }

    /**
     * Get all w2 documents.
     * @memberOf Client
     * @param {Number} page number, response is capped to maximum of 50 results per page.
     * @return {Array} An array of JSON with all w2 documents.
     */
    async get_w2_documents(page = 0) {
        this.check_w2_version();

        const endpoint_name = '/w2s/';
        const request_arguments = {};
        const params = page ? { page } : {};

        const response = await this.request<{ results: VeryfiDocument[] }>(
            'GET',
            endpoint_name,
            request_arguments,
            params,
        );

        return response.results;
    }

    /**
     * Upload a document from a file path
     * @param {String} file_path Path on disk to a file to submit for data extraction
     * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @return {JSON} Data extracted from the document.
     */
    process_w2_document(
        file_path: string,
        delete_after_processing = false,
        max_pages_to_process = 1,
        kwargs = {},
    ) {
        const file_name = path.basename(file_path);
        const image_file = fs.readFileSync(file_path, { encoding: 'base64' });
        const base64_encoded_string = Buffer.from(image_file).toString('utf-8');

        return this.process_w2_document_from_buffer(
            file_name,
            base64_encoded_string,
            delete_after_processing,
            max_pages_to_process,
            kwargs,
        );
    }

    /**
     * Get a w2 document
     * @memberOf Client
     * @param {string} id ID of the document you'd like to retrieve
     * @returns {JSON} Data extracted from the Document
     */
    get_w2_document(id: string) {
        this.check_w2_version();

        return this.request<VeryfiDocument>('GET', `/w2s/${id}/`, { id });
    }

    /**
     * Upload a document from a buffer.
     * @memberOf Client
     * @param {String} file_name The file name including the extension
     * @param {String} file_buffer Buffer of a file to submit for data extraction
     * @param {boolean} delete_after_processing Delete this document from Veryfi after data has been extracted
     * @param {int} max_pages_to_process When sending a long document to Veryfi for processing, this parameter controls how many pages of the document will be read and processed, starting from page 1.
     * @param {Object} kwargs Additional request parameters
     * @return {JSON} Data extracted from the document.
     */
    process_w2_document_from_buffer(
        file_name: string,
        file_buffer: string,
        delete_after_processing = false,
        max_pages_to_process = 1,
        kwargs = {},
    ): Promise<VeryfiDocument> {
        this.check_w2_version();

        const endpoint_name = '/w2s/';
        const request_arguments = {
            file_name,
            file_data: file_buffer,
            auto_delete: delete_after_processing,
            max_pages_to_process: max_pages_to_process,
            ...kwargs,
        };

        return this.request<VeryfiDocument>(
            'POST',
            endpoint_name,
            request_arguments,
        );
    }
}
