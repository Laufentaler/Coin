import { Base, Point, Type } from "./type";
import { ISmartPlaceable } from "./ISmartPlaceable";
import { FrameworkElement } from "./FrameworkElement";
import { Size } from "./Size";
import { SmartPosition } from "./SmartPosition";
import { Rect } from "./Rect";
/**
 * @hidden
 */
export declare class SmartPlaceableWrapper$1<T extends FrameworkElement> extends Base implements ISmartPlaceable {
    static $t: Type;
    protected $t: Type;
    constructor($t: Type);
    f: boolean;
    private c;
    d: T;
    g: Point;
    i: Point;
    getSmartPositions(): SmartPosition[];
    private a;
    private b;
    j: Size;
    k(): Size;
    getSmartBounds(a: SmartPosition): Rect;
    opacity: number;
    smartPosition: SmartPosition;
    private e;
    private h;
}
