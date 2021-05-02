import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class TimeAxisIntervalDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private h;
    range: number;
    private f;
    interval: number;
    private j;
    intervalType: string;
}
