import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ColumnWidthDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    isStarSized: boolean;
    private i;
    value: number;
    private h;
    minimumWidth: number;
}
