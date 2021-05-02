import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare class QuadTreeBoundingBox extends Base {
    static $t: Type;
    constructor();
    b: number;
    c: number;
    e: number;
    d: number;
    a(a: QuadTreeBoundingBox): boolean;
    g: any;
    f(a: QuadTreeBoundingBox): number;
}
