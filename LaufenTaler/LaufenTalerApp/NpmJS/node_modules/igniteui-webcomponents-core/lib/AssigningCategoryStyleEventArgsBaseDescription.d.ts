import { Description } from "./Description";
import { HighlightingInfoDescription } from "./HighlightingInfoDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare abstract class AssigningCategoryStyleEventArgsBaseDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private aa;
    startIndex: number;
    private z;
    endIndex: number;
    private q;
    startDate: Date;
    private p;
    endDate: Date;
    private ae;
    getItemsRef: string;
    private ad;
    fill: string;
    private af;
    stroke: string;
    private u;
    opacity: number;
    private f;
    highlightingInfo: HighlightingInfoDescription;
    private t;
    maxAllSeriesHighlightingProgress: number;
    private v;
    sumAllSeriesHighlightingProgress: number;
    private i;
    highlightingHandled: boolean;
    private h;
    hasDateRange: boolean;
    private j;
    isNegativeShape: boolean;
    private k;
    isThumbnail: boolean;
}
