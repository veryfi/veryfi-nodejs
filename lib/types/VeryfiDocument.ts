import {BoundingElement} from "./BoundingElement";
import {BillTo} from "./BillTo";
import {VeryfiExtraArgs} from "./VeryfiExtraArgs";
import {LineItem} from "./LineItem";
import {Payment} from "./Payment";
import {ShipTo} from "./ShipTo";
import {Tag} from "./Tag";
import {TaxLine} from "./TaxLine";
import {Vendor} from "./Vendor";

/**
* Object of data extracted from the document
*/
export declare type VeryfiDocument = {
    abn_number?: null | string | BoundingElement;
    account_number?: null | string | BoundingElement;
    accounting_entry_type?: null | string;
    balance?: null | string | BoundingElement;
    barcodes?: null | Array<{ data: string; type: string }>;
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
    language?: null | string[];
    license_plate_number?: null | string | BoundingElement;
    line_items?: null | LineItem[];
    line_items_with_scores?: null | LineItem[];
    meta?: null | {
        device_id?: null | string;
        device_user_uuid?: null | string;
        duplicates?: Array<{
            id: number;
            score: number;
            url: string;
        }>;
        fraud?: {
            attribution?: null | string;
            color?: string;
            custom_types?: string[];
            decision?: string;
            images?: Array<{
                is_lcd: boolean;
                score: number;
            }>;
            pages?: Array<{
                is_lcd: {
                    score: number;
                    value: boolean;
                };
            }>;
            score?: number;
            submissions?: Record<string, unknown>;
            types?: string[];
            version?: null | string;
        };
        handwritten_fields?: null | string[];
        language?: null | string[];
        owner?: null | string;
        pages?: Array<{
            height: number;
            is_blurry: {
                score: number;
                value: boolean;
            };
            language: string[];
            screenshot: {
                score: number;
                type: null | string;
            };
            width: number;
        }>;
        processed_pages?: null | number;
        source?: null | string;
        source_documents?: Array<{
            height: number;
            size_kb: number;
            width: number;
        }>;
        total_pages?: null | number;
        warnings?: Array<{
            message: string;
            type: string;
        }>;
    };
    notes?: null | string;
    ocr_text?: null | string;
    order_date?: null | string | BoundingElement;
    payment?: null | Payment;
    pdf_url?: null | string;
    previous_balance?: null | number | BoundingElement;
    purchase_order_number?: null | string | BoundingElement;
    reference_number?: null | string | BoundingElement;
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
