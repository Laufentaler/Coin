import { Description } from "./Description";
import { SeriesDescription } from "./SeriesDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ChartSeriesEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    series: SeriesDescription;
}
