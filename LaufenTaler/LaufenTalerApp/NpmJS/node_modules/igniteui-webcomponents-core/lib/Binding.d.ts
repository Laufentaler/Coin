import { Base, Type } from "./type";
import { PropertyPath } from "./PropertyPath";
/**
 * @hidden
 */
export declare class Binding extends Base {
    static $t: Type;
    constructor(a: number);
    constructor(a: number, b: string);
    constructor(a: number, ..._rest: any[]);
    c: any;
    d: any;
    e: PropertyPath;
    f: PropertyPath;
    a: boolean;
    b: boolean;
}
