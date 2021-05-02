import { Description } from "./Description";
import { ColumnFilterConditionDescription } from "./ColumnFilterConditionDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class GridFilterDialogFilterChangeEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    filter: ColumnFilterConditionDescription;
}
