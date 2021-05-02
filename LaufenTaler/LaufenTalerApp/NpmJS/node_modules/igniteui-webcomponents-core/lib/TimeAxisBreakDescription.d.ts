import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class TimeAxisBreakDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private g;
    start: Date;
    private f;
    end: Date;
    private j;
    interval: number;
}
