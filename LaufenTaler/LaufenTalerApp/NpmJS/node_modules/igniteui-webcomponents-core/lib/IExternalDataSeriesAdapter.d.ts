import { IDataSourceLocalDataProvider } from "./IDataSourceLocalDataProvider";
import { Type } from "./type";
/**
 * @hidden
 */
export interface IExternalDataSeriesAdapter {
    getDataProvider(a: any): IDataSourceLocalDataProvider;
}
/**
 * @hidden
 */
export declare let IExternalDataSeriesAdapter_$type: Type;
