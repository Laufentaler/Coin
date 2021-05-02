import { Description } from "./Description";
import { SeriesDescription } from "./SeriesDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class CalloutStyleUpdatingEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private o;
    xValueRef: string;
    private p;
    yValueRef: string;
    private k;
    itemRef: string;
    private f;
    series: SeriesDescription;
    private j;
    background: string;
    private n;
    textColor: string;
    private m;
    outline: string;
    private l;
    leaderBrush: string;
    private h;
    strokeThickness: number;
}
