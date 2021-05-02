import { Base, Type } from "./type";
import { IVisualData } from "./IVisualData";
import { Rect } from "./Rect";
/**
 * @hidden
 */
export declare class RectData extends Base implements IVisualData {
    static $t: Type;
    constructor(a: number, b: number, c: number, d: number);
    private _top;
    top: number;
    private _left;
    left: number;
    private _width;
    width: number;
    private _height;
    height: number;
    serialize(): string;
    static b(a: Rect): RectData;
    h(): Rect;
    readonly isEmpty: boolean;
    static readonly empty: RectData;
}
