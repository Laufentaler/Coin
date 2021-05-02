import { Base, Type } from "./type";
import { IDataSourceSchema } from "./IDataSourceSchema";
import { DataSourceSchemaPropertyType } from "./DataSourceSchemaPropertyType";
/**
 * @hidden
 */
export declare class ODataDataSourceSchema extends Base implements IDataSourceSchema {
    static $t: Type;
    private a;
    private c;
    private d;
    private b;
    constructor(a: string[], b: DataSourceSchemaPropertyType[], c: string[]);
    readonly propertyNames: string[];
    readonly primaryKey: string[];
    readonly propertyTypes: DataSourceSchemaPropertyType[];
    readonly propertyDataIntents: string[][];
}
