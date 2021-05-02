import { SegmentData } from "./SegmentData";
import { PointData } from "./PointData";
import { ArcSegment } from "./ArcSegment";
import { Type } from "./type";
import { RectData } from "./RectData";
import { List$1 } from "./List$1";
import { GetPointsSettings } from "./GetPointsSettings";
/**
 * @hidden
 */
export declare class ArcSegmentData extends SegmentData {
    static $t: Type;
    constructor(a: number);
    constructor(a: number, b: ArcSegment);
    constructor(a: number, ..._rest: any[]);
    protected get_type(): string;
    readonly type: string;
    private _point;
    point: PointData;
    private _isLargeArc;
    isLargeArc: boolean;
    private _isCounterClockwise;
    isCounterClockwise: boolean;
    private _sizeX;
    sizeX: number;
    private _sizeY;
    sizeY: number;
    private _rotationAngle;
    rotationAngle: number;
    protected a(): string;
    scaleByViewport(a: RectData): void;
    getPointsOverride(a: List$1<PointData>, b: GetPointsSettings): void;
}
