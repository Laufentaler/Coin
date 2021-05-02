import { EventArgs, Point, Type } from "./type";
import { UIElement } from "./UIElement";
/**
 * @hidden
 */
export declare class MouseEventArgs extends EventArgs {
    static $t: Type;
    private _position;
    position: Point;
    private _originalSource;
    originalSource: any;
    getPosition(a: UIElement): Point;
}
