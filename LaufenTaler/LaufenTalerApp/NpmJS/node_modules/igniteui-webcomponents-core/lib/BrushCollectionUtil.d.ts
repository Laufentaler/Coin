import { Base, IList$1, Type } from "./type";
import { Brush } from "./Brush";
import { BrushCollection } from "./BrushCollection";
import { Color } from "./Color";
/**
 * @hidden
 */
export declare class BrushCollectionUtil extends Base {
    static $t: Type;
    static b(a: BrushCollection, b: number): Brush;
    private static c;
    static a(a: IList$1<Color>): BrushCollection;
}
