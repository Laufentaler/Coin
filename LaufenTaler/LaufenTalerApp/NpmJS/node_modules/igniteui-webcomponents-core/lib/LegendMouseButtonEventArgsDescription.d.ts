import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class LegendMouseButtonEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    handled: boolean;
    private h;
    itemRef: string;
    private i;
    legendItemRef: string;
}
