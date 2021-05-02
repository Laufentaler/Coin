import { Base, Type } from "./type";
import { IDataSeriesAdapterRule } from "./IDataSeriesAdapterRule";
import { DataSeriesAdapterRunContext } from "./DataSeriesAdapterRunContext";
/**
 * @hidden
 */
export declare class SimpleCategorySeriesRule extends Base implements IDataSeriesAdapterRule {
    static $t: Type;
    constructor();
    private _priority;
    priority: number;
    private _useColumnThreshold;
    useColumnThreshold: number;
    private _distinctCheckThreshold;
    distinctCheckThreshold: number;
    static c(a: DataSeriesAdapterRunContext, b: number): string;
    evaluate(a: DataSeriesAdapterRunContext): void;
    private d;
}
