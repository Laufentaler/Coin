import { Base, ICollection, IEnumerable, IEnumerator, Type } from "./type";
/**
 * @hidden
 */
export declare class BitArray extends Base implements ICollection, IEnumerable {
    static $t: Type;
    private i;
    private a;
    constructor(a: number, b: BitArray);
    constructor(a: number, b: boolean[]);
    constructor(a: number, b: number);
    constructor(a: number, b: number[]);
    constructor(a: number, b: number, c: boolean);
    constructor(a: number, ..._rest: any[]);
    readonly count: number;
    readonly c: boolean;
    readonly isSynchronized: boolean;
    j: number;
    readonly syncRoot: any;
    item(a: number, b?: boolean): boolean;
    e(a: BitArray): BitArray;
    k(): any;
    copyTo(a: any[], b: number): void;
    b(a: number): boolean;
    private _getEnumeratorObject;
    getEnumeratorObject(): IEnumerator;
    f(): BitArray;
    g(a: BitArray): BitArray;
    l(a: number, b: boolean): void;
    m(a: boolean): void;
    h(a: BitArray): BitArray;
}
