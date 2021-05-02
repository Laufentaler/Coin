import { EventArgs, Type } from "./type";
import { Rect } from "./Rect";
/**
 * @hidden
 */
export declare class RectChangedEventArgs extends EventArgs {
    static $t: Type;
    constructor(a: Rect, b: Rect);
    private _oldRect;
    oldRect: Rect;
    private _newRect;
    newRect: Rect;
}
