import {BoundingElement} from "./BoundingElement";

export declare type ShipTo = {
    address?: null | string | BoundingElement;
    name?: null | string | BoundingElement;
    parsed_address?: null | Record<string, unknown>;
};
