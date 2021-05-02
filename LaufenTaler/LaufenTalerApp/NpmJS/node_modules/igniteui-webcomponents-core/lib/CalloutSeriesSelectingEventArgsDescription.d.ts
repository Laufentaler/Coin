import { Description } from "./Description";
import { SeriesDescription } from "./SeriesDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class CalloutSeriesSelectingEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private j;
    xValueRef: string;
    private k;
    yValueRef: string;
    private h;
    itemRef: string;
    private f;
    series: SeriesDescription;
    private i;
    seriesName: string;
}
