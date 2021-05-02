import { Base, Type } from "./type";
import { IVisualData } from "./IVisualData";
import { Color } from "./Color";
/**
 * @hidden
 */
export declare class ColorData extends Base implements IVisualData {
    static $t: Type;
    private _a;
    a: number;
    private _r;
    r: number;
    private _g;
    g: number;
    private _b;
    b: number;
    serialize(): string;
    static a_1(a: Color): ColorData;
    f(): Color;
}
