import { PathSegment } from "./PathSegment";
import { Point, Type } from "./type";
import { PathSegmentType } from "./PathSegmentType";
/**
 * @hidden
 */
export declare class BezierSegment extends PathSegment {
    static $t: Type;
    private b;
    e: Point;
    private c;
    f: Point;
    private d;
    g: Point;
    constructor(a: number);
    constructor(a: number, b: Point, c: Point, d: Point);
    constructor(a: number, ..._rest: any[]);
    protected get_a(): PathSegmentType;
    readonly a: PathSegmentType;
}
