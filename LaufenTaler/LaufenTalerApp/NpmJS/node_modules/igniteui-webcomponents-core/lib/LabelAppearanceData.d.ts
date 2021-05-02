import { Base, Type } from "./type";
import { IVisualData } from "./IVisualData";
import { ColorData } from "./ColorData";
import { BrushAppearanceData } from "./BrushAppearanceData";
/**
 * @hidden
 */
export declare class LabelAppearanceData extends Base implements IVisualData {
    static $t: Type;
    private _text;
    text: string;
    private _horizontalAlignment;
    horizontalAlignment: string;
    private _verticalAlignment;
    verticalAlignment: string;
    private _textAlignment;
    textAlignment: string;
    private _textWrapping;
    textWrapping: string;
    private _textPosition;
    textPosition: string;
    private _labelBrush;
    labelBrush: ColorData;
    private _labelBrushExtended;
    labelBrushExtended: BrushAppearanceData;
    private _angle;
    angle: number;
    private _opacity;
    opacity: number;
    private _visibility;
    visibility: boolean;
    private _font;
    font: string;
    private _fontFamily;
    fontFamily: string;
    private _fontSize;
    fontSize: number;
    private _fontWeight;
    fontWeight: string;
    private _fontStyle;
    fontStyle: string;
    private _fontStretch;
    fontStretch: string;
    private _marginLeft;
    marginLeft: number;
    private _marginRight;
    marginRight: number;
    private _marginTop;
    marginTop: number;
    private _marginBottom;
    marginBottom: number;
    serialize(): string;
}
