import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ZoomSliderResolvingAxisValueEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    position: number;
    private h;
    valueRef: string;
}
