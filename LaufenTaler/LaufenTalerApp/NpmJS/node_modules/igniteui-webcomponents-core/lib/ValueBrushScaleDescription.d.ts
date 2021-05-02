import { BrushScaleDescription } from "./BrushScaleDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ValueBrushScaleDescription extends BrushScaleDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private n;
    minimumValue: number;
    private m;
    maximumValue: number;
    private k;
    isLogarithmic: boolean;
    private q;
    logarithmBase: number;
}
