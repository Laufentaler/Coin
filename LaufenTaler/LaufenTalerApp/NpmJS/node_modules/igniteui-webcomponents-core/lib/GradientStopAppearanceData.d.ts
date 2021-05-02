import { Base, Type } from "./type";
import { IVisualData } from "./IVisualData";
import { ColorData } from "./ColorData";
/**
 * @hidden
 */
export declare class GradientStopAppearanceData extends Base implements IVisualData {
    static $t: Type;
    private _colorValue;
    colorValue: ColorData;
    private _offset;
    offset: number;
    serialize(): string;
}
