import { Description } from "./Description";
import { SeriesDescription } from "./SeriesDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class CalloutAnnotationDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private z;
    xValueRef: string;
    private aa;
    yValueRef: string;
    private x;
    text: string;
    private u;
    keyRef: string;
    private s;
    contentRef: string;
    private f;
    series: SeriesDescription;
    private t;
    formatLabelRef: string;
    private y;
    textColor: string;
    private r;
    background: string;
    private w;
    outline: string;
    private v;
    leaderBrush: string;
    private l;
    strokeThickness: number;
    private i;
    backgroundPaddingLeft: number;
    private k;
    backgroundPaddingTop: number;
    private j;
    backgroundPaddingRight: number;
    private h;
    backgroundPaddingBottom: number;
}
