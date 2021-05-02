import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class GroupDataDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private g;
    groupName: string;
    private h;
    groupValueRef: string;
    private f;
    formattedText: string;
}
