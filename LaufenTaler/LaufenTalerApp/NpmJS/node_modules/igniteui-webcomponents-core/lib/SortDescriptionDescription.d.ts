import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class SortDescriptionDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private g;
    propertyName: string;
    private f;
    direction: string;
}
