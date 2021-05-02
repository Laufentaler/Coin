import { GeometryData } from "./GeometryData";
import { Type } from "./type";
import { RectData } from "./RectData";
import { List$1 } from "./List$1";
import { PointData } from "./PointData";
import { GetPointsSettings } from "./GetPointsSettings";
/**
 * @hidden
 */
export declare class EllipseGeometryData extends GeometryData {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    private _centerX;
    centerX: number;
    private _centerY;
    centerY: number;
    private _radiusX;
    radiusX: number;
    private _radiusY;
    radiusY: number;
    protected a(): string;
    scaleByViewport(a: RectData): void;
    getPointsOverride(a: List$1<List$1<PointData>>, b: GetPointsSettings): void;
}
