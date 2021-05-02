import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class ColumnExchangerDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    targetIndex: number;
}
