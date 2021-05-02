import { PathSegment } from "./PathSegment";
import { Point, Type } from "./type";
import { PathSegmentType } from "./PathSegmentType";
/**
 * @hidden
 */
export declare class LineSegment extends PathSegment {
    static $t: Type;
    private b;
    c: Point;
    constructor(a: number, b: Point);
    constructor(a: number);
    constructor(a: number, ..._rest: any[]);
    protected get_a(): PathSegmentType;
    readonly a: PathSegmentType;
}
