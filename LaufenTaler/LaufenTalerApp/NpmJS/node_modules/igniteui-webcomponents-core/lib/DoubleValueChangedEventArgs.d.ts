import { EventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class DoubleValueChangedEventArgs extends EventArgs {
    static $t: Type;
    constructor(a: number, b: number);
    private _oldValue;
    oldValue: number;
    private _newValue;
    newValue: number;
}
