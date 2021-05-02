import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class LegendMouseEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    itemRef: string;
    private g;
    legendItemRef: string;
}
