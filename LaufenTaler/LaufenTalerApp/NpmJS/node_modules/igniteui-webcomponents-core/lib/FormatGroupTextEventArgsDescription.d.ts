import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class FormatGroupTextEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private h;
    groupName: string;
    private i;
    groupValueRef: string;
    private g;
    formattedValue: string;
    private f;
    formattedText: string;
}
