import { ColumnFilterConditionDescription } from "./ColumnFilterConditionDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ColumnFilterConditionGroupDescription extends ColumnFilterConditionDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private i;
    usesOrOperator: boolean;
    private g;
    item: ColumnFilterConditionDescription;
}
