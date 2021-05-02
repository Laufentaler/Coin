import { PrimitiveVisualData } from "./PrimitiveVisualData";
import { Line } from "./Line";
import { Type } from "./type";
import { RectData } from "./RectData";
import { List$1 } from "./List$1";
import { PointData } from "./PointData";
import { GetPointsSettings } from "./GetPointsSettings";
/**
 * @hidden
 */
export declare class LineVisualData extends PrimitiveVisualData {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor(a: number);
    constructor(a: number, b: string, c: Line);
    constructor(a: number, ..._rest: any[]);
    private _x1;
    x1: number;
    private _y1;
    y1: number;
    private _x2;
    x2: number;
    private _y2;
    y2: number;
    protected e(): string;
    scaleByViewport(a: RectData): void;
    getPointsOverride(a: List$1<List$1<PointData>>, b: GetPointsSettings): void;
}
