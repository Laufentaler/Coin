import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class DataBindingEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    resolvedValueRef: string;
    private g;
    rowObjectRef: string;
}
