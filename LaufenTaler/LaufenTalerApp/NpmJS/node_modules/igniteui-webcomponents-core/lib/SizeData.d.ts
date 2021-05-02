import { Base, Type } from "./type";
import { IVisualData } from "./IVisualData";
import { Size } from "./Size";
/**
 * @hidden
 */
export declare class SizeData extends Base implements IVisualData {
    static $t: Type;
    constructor(a: number, b: number);
    private _width;
    width: number;
    private _height;
    height: number;
    serialize(): string;
    static b(a: Size): SizeData;
    e(): Size;
    static readonly empty: SizeData;
}
