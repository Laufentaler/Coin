import { Description } from "./Description";
import { SeriesDescription } from "./SeriesDescription";
import { SeriesViewerDescription } from "./SeriesViewerDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ChartCursorEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private j;
    itemRef: string;
    private f;
    series: SeriesDescription;
    private h;
    seriesViewer: SeriesViewerDescription;
}
