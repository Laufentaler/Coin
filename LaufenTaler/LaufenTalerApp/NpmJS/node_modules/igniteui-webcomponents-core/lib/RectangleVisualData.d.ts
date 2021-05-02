import { PrimitiveVisualData } from "./PrimitiveVisualData";
import { Type } from "./type";
import { Rectangle } from "./Rectangle";
import { RectData } from "./RectData";
import { List$1 } from "./List$1";
import { PointData } from "./PointData";
import { GetPointsSettings } from "./GetPointsSettings";
/**
 * @hidden
 */
export declare class RectangleVisualData extends PrimitiveVisualData {
    static $t: Type;
    constructor(a: number);
    constructor(a: number, b: string, c: Rectangle);
    constructor(a: number, ..._rest: any[]);
    private _width;
    width: number;
    private _height;
    height: number;
    private _radiusX;
    radiusX: number;
    private _radiusY;
    radiusY: number;
    protected e(): string;
    protected get_type(): string;
    readonly type: string;
    scaleByViewport(a: RectData): void;
    getPointsOverride(a: List$1<List$1<PointData>>, b: GetPointsSettings): void;
}
