import { PropertyChangedEventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class PropertyChangedEventArgs$1<T> extends PropertyChangedEventArgs {
    static $t: Type;
    protected $t: Type;
    constructor($t: Type, a: string, b: T, c: T);
    private _oldValue;
    oldValue: T;
    private _newValue;
    newValue: T;
}
