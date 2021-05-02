import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class CellStyleRequestedEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private i;
    styleKey: string;
    private h;
    resolvedValueRef: string;
    private f;
    rowNumber: number;
}
