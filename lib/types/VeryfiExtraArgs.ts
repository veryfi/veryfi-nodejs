/**
 * Additional request parameters type.
 * Nested objects, arrays, and nulls are allowed because several Veryfi
 * body fields (device_data, vendor, line_items, document_types, tags) are not scalars.
 */
export declare type VeryfiExtraArgs = Record<string | number | symbol, any>;

export type JsonObject = Record<string, any>;
