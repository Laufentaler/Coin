import { Base, Type } from "./type";
import { FilterExpression } from "./FilterExpression";
import { IFilterExpression } from "./IFilterExpression";
import { DataSourceSchemaPropertyType } from "./DataSourceSchemaPropertyType";
/**
 * @hidden
 */
export declare class FilterFactory extends Base {
    static $t: Type;
    private static as;
    static readonly instance: FilterFactory;
    static build(a: (b: FilterFactory) => FilterExpression): FilterExpression;
    property(a: string): FilterExpression;
    literal(a: any): FilterExpression;
    group(a: IFilterExpression): FilterExpression;
    and(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    or(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    not(a: IFilterExpression): FilterExpression;
    add(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    divide(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    equal(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    greaterThan(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    greaterThanOrEqual(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    lessThan(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    lessThanOrEqual(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    modulus(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    multiply(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    notEqual(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    subtract(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    ceiling(a: IFilterExpression): FilterExpression;
    concat(a: IFilterExpression, b: IFilterExpression): FilterExpression;
    concat1(a: IFilterExpression, b: string): FilterExpression;
    contains(a: IFilterExpression, b: IFilterExpression | string): FilterExpression;
    day(a: IFilterExpression): FilterExpression;
    endsWith(a: IFilterExpression, b: IFilterExpression | string): FilterExpression;
    floor(a: IFilterExpression): FilterExpression;
    hour(a: IFilterExpression): FilterExpression;
    indexOf(a: IFilterExpression, b: IFilterExpression | string): FilterExpression;
    length(a: IFilterExpression): FilterExpression;
    minute(a: IFilterExpression): FilterExpression;
    month(a: IFilterExpression): FilterExpression;
    replace(a: IFilterExpression, b: IFilterExpression | string, c: IFilterExpression | string): FilterExpression;
    round(a: IFilterExpression): FilterExpression;
    second(a: IFilterExpression): FilterExpression;
    startsWith(a: IFilterExpression, b: IFilterExpression | string): FilterExpression;
    substring(a: IFilterExpression, b: IFilterExpression | number, c?: IFilterExpression | number): FilterExpression;
    toLower(a: IFilterExpression): FilterExpression;
    toUpper(a: IFilterExpression): FilterExpression;
    trim(a: IFilterExpression): FilterExpression;
    year(a: IFilterExpression): FilterExpression;
    date(a: IFilterExpression): FilterExpression;
    time(a: IFilterExpression): FilterExpression;
    now(): FilterExpression;
    isOf(a: IFilterExpression, b: DataSourceSchemaPropertyType): FilterExpression;
    cast(a: IFilterExpression, b: DataSourceSchemaPropertyType): FilterExpression;
}
