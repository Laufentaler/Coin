import { Description } from "./Description";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class DataSourceSupportingCalculationDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
}
