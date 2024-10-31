import {BoundingElement} from "./BoundingElement";

export declare type BillTo = {
    address?: null | string | BoundingElement;
    email?: null | string | BoundingElement;
    name?: null | string | BoundingElement;
    parsed_address?: null | string;
    phone_number?: null | number | string | BoundingElement;
    reg_number?: null | number | string | BoundingElement;
    vat_number?: null | number | string | BoundingElement;
};
