import { Base, IEnumerator$1, IEnumerator, Type } from "./type";
import { IFastItemColumnInternal } from "./IFastItemColumnInternal";
import { IFastItemColumn$1 } from "./IFastItemColumn$1";
import { IFastItemsSource } from "./IFastItemsSource";
import { List$1 } from "./List$1";
/**
 * @hidden
 */
export declare class FastItemIntColumn extends Base implements IFastItemColumnInternal, IFastItemColumn$1<number> {
    static $t: Type;
    private h;
    private d;
    private e;
    private a;
    constructor(a: IFastItemsSource, b: string, c: (arg1: any) => any, d: boolean);
    c: IFastItemsSource;
    private b;
    private _propertyName;
    propertyName: string;
    minimum: number;
    private j;
    maximum: number;
    private i;
    item(a: number, b?: number): number;
    getEnumerator(): IEnumerator$1<number>;
    getEnumeratorObject(): IEnumerator;
    contains(a: number): boolean;
    copyTo(a: number[], b: number): void;
    readonly count: number;
    readonly isReadOnly: boolean;
    indexOf(a: number): number;
    add(a: number): void;
    clear(): void;
    remove(a: number): boolean;
    insert(a: number, b: number): void;
    removeAt(a: number): void;
    reset(): boolean;
    insertRange(a: number, b: number): boolean;
    replaceRange(a: number, b: number): boolean;
    removeRange(a: number, b: number): boolean;
    private k;
    private g;
    readonly mayContainUnknowns: boolean;
    f(): List$1<number>;
    asArray(): number[];
    getItem(a: number): any;
    static m(): void;
}
