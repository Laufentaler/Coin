import { IDataSourceDataProvider } from "./IDataSourceDataProvider";
import { IDataSourceSupportsIndexedAccess } from "./IDataSourceSupportsIndexedAccess";
import { Type } from "./type";
/**
 * @hidden
 */
export interface IDataSourceLocalDataProvider extends IDataSourceDataProvider, IDataSourceSupportsIndexedAccess {
    dataSource: any;
}
/**
 * @hidden
 */
export declare let IDataSourceLocalDataProvider_$type: Type;
