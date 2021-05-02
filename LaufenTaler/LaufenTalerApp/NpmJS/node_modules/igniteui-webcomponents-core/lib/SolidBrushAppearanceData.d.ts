import { BrushAppearanceData } from "./BrushAppearanceData";
import { ColorData } from "./ColorData";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class SolidBrushAppearanceData extends BrushAppearanceData {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    private _colorValue;
    colorValue: ColorData;
    protected a(): string;
}
