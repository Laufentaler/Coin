import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class AxisRangeChangedEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private i;
    oldMinimumValue: number;
    private g;
    minimumValue: number;
    private h;
    oldMaximumValue: number;
    private f;
    maximumValue: number;
}
