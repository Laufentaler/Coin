import { LegendBaseDescription } from "./LegendBaseDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class LegendDescription extends LegendBaseDescription {
    static $t: Type;
    private w;
    width: string;
    private s;
    height: string;
    protected get_type(): string;
    constructor();
    private t;
    orientation: string;
    private u;
    textColor: string;
    private v;
    textStyle: string;
}
