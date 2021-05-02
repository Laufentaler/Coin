import { Description } from "./Description";
import { RectDescription } from "./RectDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class RectChangedEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private g;
    oldRect: RectDescription;
    private f;
    newRect: RectDescription;
}
