import { DataSourceSchemaPropertyType } from "./DataSourceSchemaPropertyType";
import { Type } from "./type";
/**
 * @hidden
 */
export interface IDataSourceSchema {
    readonly primaryKey: string[];
    readonly propertyNames: string[];
    readonly propertyTypes: DataSourceSchemaPropertyType[];
    readonly propertyDataIntents: string[][];
}
/**
 * @hidden
 */
export declare let IDataSourceSchema_$type: Type;
