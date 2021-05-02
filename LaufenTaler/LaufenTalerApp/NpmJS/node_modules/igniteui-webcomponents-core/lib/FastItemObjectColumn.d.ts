import { Base, IEnumerator$1, IEnumerator, Type } from "./type";
import { IFastItemColumnInternal } from "./IFastItemColumnInternal";
import { IFastItemColumn$1 } from "./IFastItemColumn$1";
import { IFastItemsSource } from "./IFastItemsSource";
import { List$1 } from "./List$1";
/**
 * @hidden
 */
export declare class FastItemObjectColumn extends Base implements IFastItemColumnInternal, IFastItemColumn$1<any> {
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
    minimum: any;
    private j;
    maximum: any;
    private i;
    item(a: number, b?: any): any;
    getEnumerator(): IEnumerator$1<any>;
    getEnumeratorObject(): IEnumerator;
    contains(a: any): boolean;
    copyTo(a: any[], b: number): void;
    readonly count: number;
    readonly isReadOnly: boolean;
    indexOf(a: any): number;
    add(a: any): void;
    clear(): void;
    remove(a: any): boolean;
    insert(a: number, b: any): void;
    removeAt(a: number): void;
    reset(): boolean;
    insertRange(a: number, b: number): boolean;
    replaceRange(a: number, b: number): boolean;
    removeRange(a: number, b: number): boolean;
    private k;
    private g;
    readonly mayContainUnknowns: boolean;
    f(): List$1<number>;
    asArray(): any[];
    getItem(a: number): any;
    static m(): void;
}
