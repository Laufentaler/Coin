import { Base, IEnumerator$1, IEnumerator, Type } from "./type";
import { IFastItemColumnInternal } from "./IFastItemColumnInternal";
import { IFastItemColumn$1 } from "./IFastItemColumn$1";
import { IFastItemsSource } from "./IFastItemsSource";
import { List$1 } from "./List$1";
/**
 * @hidden
 */
export declare class FastItemDateTimeColumn extends Base implements IFastItemColumnInternal, IFastItemColumn$1<Date> {
    static $t: Type;
    private m;
    private d;
    private e;
    private a;
    constructor(a: IFastItemsSource, b: string, c: (arg1: any) => any, d: boolean);
    c: IFastItemsSource;
    private b;
    private _propertyName;
    propertyName: string;
    private g;
    private f;
    minimum: Date;
    private k;
    maximum: Date;
    private j;
    item(a: number, b?: Date): Date;
    getEnumerator(): IEnumerator$1<Date>;
    getEnumeratorObject(): IEnumerator;
    contains(a: Date): boolean;
    copyTo(a: Date[], b: number): void;
    readonly count: number;
    readonly isReadOnly: boolean;
    indexOf(a: Date): number;
    add(a: Date): void;
    clear(): void;
    remove(a: Date): boolean;
    insert(a: number, b: Date): void;
    removeAt(a: number): void;
    reset(): boolean;
    insertRange(a: number, b: number): boolean;
    removeRange(a: number, b: number): boolean;
    p(a: Date, b: Date): void;
    replaceRange(a: number, b: number): boolean;
    private l;
    private i;
    readonly mayContainUnknowns: boolean;
    h(): List$1<number>;
    asArray(): Date[];
    getItem(a: number): any;
    static o(): void;
}
