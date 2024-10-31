import {BoundingElement} from "./BoundingElement";

export declare type TaxLine = {
    base?: null | number | BoundingElement;
    name?: null | string | BoundingElement;
    order?: null | number;
    rate?: null | number | BoundingElement;
    total?: null | number | BoundingElement;
};
