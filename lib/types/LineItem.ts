import {BoundingElement} from "./BoundingElement";


export declare type LineItem = {
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
    tax?: null | number | BoundingElement;
    tax_rate?: null | number;
    total?: null | number | BoundingElement;
    type?: null | string;
    unit_of_measure?: null | string;
};
