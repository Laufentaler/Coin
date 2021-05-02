import { Description } from "./Description";
import { SeriesDescription } from "./SeriesDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class HighlightingInfoDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private m;
    startIndex: number;
    private l;
    endIndex: number;
    private p;
    state: string;
    private j;
    progress: number;
    private h;
    isMarker: boolean;
    private f;
    series: SeriesDescription;
}
