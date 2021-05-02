import { Description } from "./Description";
import { GridFilterDialogViewModelRowDescription } from "./GridFilterDialogViewModelRowDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class GridFilterDialogViewModelDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private l;
    propertyType: string;
    private h;
    isTopLevelOr: boolean;
    private j;
    maxGroupingLevels: number;
    private f;
    rows: GridFilterDialogViewModelRowDescription[];
}
