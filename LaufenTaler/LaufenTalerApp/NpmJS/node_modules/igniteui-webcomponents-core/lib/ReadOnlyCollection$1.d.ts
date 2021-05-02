import { Base, IList$1, IList, IEnumerator$1, IEnumerator, Type } from "./type";
/**
 * @hidden
 */
export declare class ReadOnlyCollection$1<T> extends Base implements IList$1<T>, IList {
    static $t: Type;
    protected $t: Type;
    constructor($t: Type, a: number);
    constructor($t: Type, a: number, b: IList$1<T>);
    constructor($t: Type, a: number, ..._rest: any[]);
    private a;
    item(a: number, b?: T): T;
    indexOf(a: T): number;
    insert(a: number, b: T): void;
    removeAt(a: number): void;
    readonly count: number;
    readonly isReadOnly: boolean;
    add(a: T): void;
    clear(): void;
    contains(a: T): boolean;
    copyTo(a: T[], b: number): void;
    remove(a: T): boolean;
    getEnumerator(): IEnumerator$1<T>;
    getEnumeratorObject(): IEnumerator;
    readonly isFixedSize: boolean;
    add1(a: any): number;
    contains1(a: any): boolean;
    indexOf1(a: any): number;
    insert1(a: number, b: any): void;
    remove1(a: any): void;
    copyTo1(a: any[], b: number): void;
    protected readonly b: IList$1<T>;
    readonly isSynchronized: boolean;
    private readonly c;
    readonly syncRoot: any;
}
