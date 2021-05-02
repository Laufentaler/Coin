import { FilterExpressionDescription } from "./FilterExpressionDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class OperationFilterExpressionDescription extends FilterExpressionDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private l;
    propertyName: string;
    private m;
    valueRef: string;
    private g;
    left: FilterExpressionDescription;
    private h;
    right: FilterExpressionDescription;
    private k;
    operator: string;
}
