import { ColumnFilterConditionDescription } from "./ColumnFilterConditionDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ColumnComparisonFilterConditionDescription extends ColumnFilterConditionDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private i;
    operator: string;
    private j;
    valueRef: string;
    private g;
    isCaseSensitive: boolean;
}
