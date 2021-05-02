import { ColorScaleDescription } from "./ColorScaleDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class CustomPaletteColorScaleDescription extends ColorScaleDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private l;
    minimumValue: number;
    private k;
    maximumValue: number;
    private i;
    palette: string[];
    private o;
    interpolationMode: string;
}
