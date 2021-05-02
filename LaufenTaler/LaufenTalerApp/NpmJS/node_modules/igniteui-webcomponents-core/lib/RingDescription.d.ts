import { Description } from "./Description";
import { SizeDescription } from "./SizeDescription";
import { PointDescription } from "./PointDescription";
import { RingSeriesBaseDescription } from "./RingSeriesBaseDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class RingDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private p;
    index: number;
    private l;
    innerExtend: number;
    private j;
    controlSize: SizeDescription;
    private f;
    center: PointDescription;
    private h;
    ringSeries: RingSeriesBaseDescription;
    private m;
    ringBreadth: number;
}
