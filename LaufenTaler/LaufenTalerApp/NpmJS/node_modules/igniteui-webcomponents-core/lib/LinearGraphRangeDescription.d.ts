import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class LinearGraphRangeDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private u;
    name: string;
    private t;
    brush: string;
    private v;
    outline: string;
    private k;
    startValue: number;
    private f;
    endValue: number;
    private h;
    innerStartExtent: number;
    private g;
    innerEndExtent: number;
    private j;
    outerStartExtent: number;
    private i;
    outerEndExtent: number;
    private l;
    strokeThickness: number;
}
