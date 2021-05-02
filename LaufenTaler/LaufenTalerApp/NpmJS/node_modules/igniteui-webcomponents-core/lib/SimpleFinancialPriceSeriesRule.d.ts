import { Base, Type } from "./type";
import { IDataSeriesAdapterRule } from "./IDataSeriesAdapterRule";
import { DataSeriesAdapterRunContext } from "./DataSeriesAdapterRunContext";
/**
 * @hidden
 */
export declare class SimpleFinancialPriceSeriesRule extends Base implements IDataSeriesAdapterRule {
    static $t: Type;
    constructor();
    private _priority;
    priority: number;
    private _distinctCheckThreshold;
    distinctCheckThreshold: number;
    private e;
    static d(a: DataSeriesAdapterRunContext, b: number): string;
    static b(a: DataSeriesAdapterRunContext, b: number): string;
    evaluate(a: DataSeriesAdapterRunContext): void;
    private c;
}
