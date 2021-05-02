import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare class StackPool$1<T> extends Base {
    static $t: Type;
    protected $t: Type;
    constructor($t: Type);
    a(): T;
    n(a: T): void;
    f: boolean;
    private e;
    readonly k: number;
    readonly l: number;
    j: () => T;
    c: (arg1: T) => void;
    b: (arg1: T) => void;
    d: (arg1: T) => void;
    private static m;
    private g;
    private i;
    private h;
}
