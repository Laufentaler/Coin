import { Base, Type } from "./type";
import { ListSortDirection } from "./ListSortDirection";
/**
 * @hidden
 */
export declare class SortDescription extends Base {
    static $t: Type;
    private b;
    constructor();
    private g;
    propertyName: string;
    private d;
    direction: ListSortDirection;
    equals(a: any): boolean;
    getHashCode(): number;
    i(): void;
    static create(a: string, b: ListSortDirection): SortDescription;
}
