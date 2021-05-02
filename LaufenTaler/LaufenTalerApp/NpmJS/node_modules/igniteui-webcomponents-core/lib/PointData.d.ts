import { Base, Point, Type } from "./type";
import { IVisualData } from "./IVisualData";
/**
 * @hidden
 */
export declare class PointData extends Base implements IVisualData {
    static $t: Type;
    constructor(a: number, b: number);
    private _x;
    x: number;
    private _y;
    y: number;
    serialize(): string;
    static b(a: Point): PointData;
    g(): Point;
    equals(a: any): boolean;
    getHashCode(): number;
    static readonly empty: PointData;
}
