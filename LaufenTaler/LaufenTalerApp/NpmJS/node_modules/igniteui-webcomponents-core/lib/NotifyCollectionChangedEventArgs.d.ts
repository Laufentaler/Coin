import { EventArgs, IList, Type } from "./type";
import { NotifyCollectionChangedAction } from "./NotifyCollectionChangedAction";
/**
 * @hidden
 */
export declare class NotifyCollectionChangedEventArgs extends EventArgs {
    static $t: Type;
    constructor(a: number, b: NotifyCollectionChangedAction);
    constructor(a: number, b: NotifyCollectionChangedAction, c: any, d: number);
    constructor(a: number, b: NotifyCollectionChangedAction, c: any, d: any, e: number);
    constructor(a: number, ..._rest: any[]);
    private f;
    readonly action: NotifyCollectionChangedAction;
    private b;
    readonly newItems: IList;
    private h;
    readonly newStartingIndex: number;
    private c;
    readonly oldItems: IList;
    private i;
    readonly oldStartingIndex: number;
}
