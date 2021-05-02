import { PathSegment } from "./PathSegment";
import { PointCollection } from "./PointCollection";
import { PathSegmentType } from "./PathSegmentType";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class PolyLineSegment extends PathSegment {
    static $t: Type;
    constructor();
    _points: PointCollection;
    points: PointCollection;
    protected get_a(): PathSegmentType;
    readonly a: PathSegmentType;
}
