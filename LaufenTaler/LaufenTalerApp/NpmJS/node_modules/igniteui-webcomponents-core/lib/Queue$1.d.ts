import { Base, ICollection, IEnumerable$1, IEnumerator$1, IEnumerator, Type } from "./type";
/**
 * @hidden
 */
export declare class Queue$1<T> extends Base implements ICollection, IEnumerable$1<T> {
    static $t: Type;
    protected $t: Type;
    private d;
    private e;
    private f;
    private a;
    constructor($t: Type);
    readonly count: number;
    copyTo(a: any[], b: number): void;
    readonly isSynchronized: boolean;
    readonly syncRoot: any;
    private _getEnumerator;
    getEnumerator(): IEnumerator$1<T>;
    getEnumeratorObject(): IEnumerator;
    g(a: T): void;
    b(): T;
    c(): T;
}
