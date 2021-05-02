import { ContourValueResolverDescription } from "./ContourValueResolverDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class LinearContourValueResolverDescription extends ContourValueResolverDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private g;
    valueCount: number;
}
