import { LegendBaseDescription } from "./LegendBaseDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ItemLegendDescription extends LegendBaseDescription {
    static $t: Type;
    private t;
    width: string;
    private s;
    height: string;
    protected get_type(): string;
    constructor();
}
