import { Base, Type } from "./type";
import { IDataSeriesAdapterRule } from "./IDataSeriesAdapterRule";
import { DataSeriesAdapterRunContext } from "./DataSeriesAdapterRunContext";
/**
 * @hidden
 */
export declare class SimpleScatterSeriesRule extends Base implements IDataSeriesAdapterRule {
    static $t: Type;
    constructor();
    private _priority;
    priority: number;
    private _monotonicCheckAmount;
    monotonicCheckAmount: number;
    evaluate(a: DataSeriesAdapterRunContext): void;
    private d;
    private b;
    private c;
    private a;
    private f;
}
