import { FilterExpressionDescription } from "./FilterExpressionDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class PropertyReferenceFilterExpressionDescription extends FilterExpressionDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private g;
    propertyReference: string;
}
