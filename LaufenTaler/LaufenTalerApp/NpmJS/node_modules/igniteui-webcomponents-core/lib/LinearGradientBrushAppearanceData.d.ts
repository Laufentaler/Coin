import { BrushAppearanceData } from "./BrushAppearanceData";
import { List$1 } from "./List$1";
import { GradientStopAppearanceData } from "./GradientStopAppearanceData";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class LinearGradientBrushAppearanceData extends BrushAppearanceData {
    static $t: Type;
    constructor();
    protected get_type(): string;
    readonly type: string;
    private _startX;
    startX: number;
    private _startY;
    startY: number;
    private _endX;
    endX: number;
    private _endY;
    endY: number;
    private _stops;
    stops: List$1<GradientStopAppearanceData>;
    protected a(): string;
}
