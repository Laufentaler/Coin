import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ResponsivePhaseDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private h;
    name: string;
    private f;
    delayMilliseconds: number;
}
