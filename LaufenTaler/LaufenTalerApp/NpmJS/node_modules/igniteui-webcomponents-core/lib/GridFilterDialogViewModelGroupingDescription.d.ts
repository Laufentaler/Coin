import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class GridFilterDialogViewModelGroupingDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private i;
    startIndex: number;
    private h;
    endIndex: number;
    private f;
    isOrGrouping: boolean;
}
