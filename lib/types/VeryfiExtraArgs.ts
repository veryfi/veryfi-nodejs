/**
 * Additional request parameters type.
 * Nested objects, arrays, and nulls are allowed because several Veryfi
 * body fields (device_data, vendor, line_items, document_types, tags) are not scalars.
 */
export declare type VeryfiExtraArgs = Record<string | number | symbol, any>;

/**
 * Thinking Mode for receipt and invoice extraction on
 * POST /api/v8/partner/documents.
 * `light` runs a smaller agent review. `deep` runs the most thorough review.
 * Omit the field to use the standard real-time pipeline.
 * https://docs.veryfi.com/api/receipts-invoices/process-a-document/
 * https://faq.veryfi.com/en/articles/18356750-what-is-thinking-mode-and-how-do-i-use-it
 */
export type ThinkingMode = "light" | "deep";

/**
 * Extra body fields for Process a Document.
 * https://docs.veryfi.com/api/receipts-invoices/process-a-document/
 */
export interface DocumentProcessArgs {
    thinking?: ThinkingMode | null;
    [key: string]: any;
}

export type JsonObject = Record<string, any>;
