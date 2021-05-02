import { EventArgs, Type } from "./type";
import { FastItemsSourceEventAction } from "./FastItemsSourceEventAction";
/**
 * @hidden
 */
export declare class FastItemsSourceEventArgs extends EventArgs {
    static $t: Type;
    constructor(a: number, b: FastItemsSourceEventAction, c: number, d: number);
    constructor(a: number, b: number, c: string);
    constructor(a: number, ..._rest: any[]);
    private _action;
    action: FastItemsSourceEventAction;
    private _position;
    position: number;
    private _count;
    count: number;
    private _propertyName;
    propertyName: string;
}
