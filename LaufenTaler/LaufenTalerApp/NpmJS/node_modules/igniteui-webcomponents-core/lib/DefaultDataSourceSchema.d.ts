import { Base, Type } from "./type";
import { IDataSourceSchema } from "./IDataSourceSchema";
import { DataSourceSchemaPropertyType } from "./DataSourceSchemaPropertyType";
/**
 * @hidden
 */
export declare class DefaultDataSourceSchema extends Base implements IDataSourceSchema {
    static $t: Type;
    private c;
    private d;
    private a;
    private b;
    constructor(a: string[], b: DataSourceSchemaPropertyType[], c: string[], d: string[][]);
    readonly primaryKey: string[];
    readonly propertyNames: string[];
    readonly propertyTypes: DataSourceSchemaPropertyType[];
    readonly propertyDataIntents: string[][];
}
