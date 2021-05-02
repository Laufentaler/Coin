import { Base, Type } from "./type";
import { IVisualData } from "./IVisualData";
import { ColorData } from "./ColorData";
import { BrushAppearanceData } from "./BrushAppearanceData";
import { RectData } from "./RectData";
/**
 * @hidden
 */
export declare class PrimitiveAppearanceData extends Base implements IVisualData {
    static $t: Type;
    private _stroke;
    stroke: ColorData;
    private _strokeExtended;
    strokeExtended: BrushAppearanceData;
    private _fill;
    fill: ColorData;
    private _fillExtended;
    fillExtended: BrushAppearanceData;
    private _strokeThickness;
    strokeThickness: number;
    private _isVisible;
    isVisible: boolean;
    private _opacity;
    opacity: number;
    private _canvasLeft;
    canvasLeft: number;
    private _canvasTop;
    canvasTop: number;
    private _canvaZIndex;
    canvaZIndex: number;
    private _dashArray;
    dashArray: any[];
    private _dashCap;
    dashCap: number;
    m(a: RectData): void;
    serialize(): string;
}
