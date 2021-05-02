import { Description } from "./Description";
import { StyleDescription } from "./StyleDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class StackedSeriesCreatedEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private j;
    brush: string;
    private l;
    legendItemTemplateRef: string;
    private k;
    legendItemBadgeTemplateRef: string;
    private m;
    legendItemVisibility: string;
    private r;
    outline: string;
    private h;
    thickness: number;
    private s;
    titleRef: string;
    private n;
    markerBrush: string;
    private o;
    markerOutline: string;
    private f;
    markerStyle: StyleDescription;
    private p;
    markerTemplateRef: string;
    private q;
    markerType: string;
}
