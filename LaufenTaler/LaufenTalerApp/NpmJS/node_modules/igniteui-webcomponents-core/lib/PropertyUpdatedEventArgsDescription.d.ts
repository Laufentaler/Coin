import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class PropertyUpdatedEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private h;
    propertyName: string;
    private g;
    oldValueRef: string;
    private f;
    newValueRef: string;
}
