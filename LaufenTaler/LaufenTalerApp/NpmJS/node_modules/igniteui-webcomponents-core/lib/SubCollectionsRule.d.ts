import { Base, Type } from "./type";
import { IDataSeriesAdapterRule } from "./IDataSeriesAdapterRule";
import { DataSeriesAdapterRunContext } from "./DataSeriesAdapterRunContext";
/**
 * @hidden
 */
export declare class SubCollectionsRule extends Base implements IDataSeriesAdapterRule {
    static $t: Type;
    constructor();
    private _priority;
    priority: number;
    private _collectionTransformationThreshold;
    collectionTransformationThreshold: number;
    evaluate(a: DataSeriesAdapterRunContext): void;
}
