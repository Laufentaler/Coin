import { Description } from "./Description";
import { FilterExpressionDescription } from "./FilterExpressionDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class GridFilterExpressionsEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    filterExpressions: FilterExpressionDescription[];
}
