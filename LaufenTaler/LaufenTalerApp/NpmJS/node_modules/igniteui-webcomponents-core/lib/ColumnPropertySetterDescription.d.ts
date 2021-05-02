import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ColumnPropertySetterDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    columnName: string;
    private g;
    propertyName: string;
    private h;
    valueRef: string;
}
