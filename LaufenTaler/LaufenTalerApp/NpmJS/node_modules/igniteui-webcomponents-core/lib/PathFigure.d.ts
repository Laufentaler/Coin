import { Base, Point, Type } from "./type";
import { PathSegmentCollection } from "./PathSegmentCollection";
/**
 * @hidden
 */
export declare class PathFigure extends Base {
    static $t: Type;
    constructor();
    _segments: PathSegmentCollection;
    segments: PathSegmentCollection;
    _startPoint: Point;
    startPoint: Point;
    _isFilled: boolean;
    isFilled: boolean;
    _isClosed: boolean;
    isClosed: boolean;
}
