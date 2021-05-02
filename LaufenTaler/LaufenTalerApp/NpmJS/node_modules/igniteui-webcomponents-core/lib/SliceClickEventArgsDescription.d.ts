import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class SliceClickEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private g;
    isSelected: boolean;
    private f;
    isExploded: boolean;
    private j;
    originalEventRef: string;
}
