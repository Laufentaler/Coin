import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class GridAnimationPhaseSettingsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private i;
    durationMilliseconds: number;
    private j;
    holdInitialMilliseconds: number;
    private k;
    perItemDelayMilliseconds: number;
    private l;
    subItemDurationMilliseconds: number;
    private h;
    desiredSubItemDurationMilliseconds: number;
    private f;
    shouldItemsFinishSimultaneously: boolean;
    private r;
    easingFunctionType: string;
}
