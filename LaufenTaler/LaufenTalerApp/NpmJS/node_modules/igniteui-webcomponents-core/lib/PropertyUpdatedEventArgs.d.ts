import { EventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class PropertyUpdatedEventArgs extends EventArgs {
    static $t: Type;
    constructor(a: string, b: any, c: any);
    private _propertyName;
    propertyName: string;
    private _oldValue;
    oldValue: any;
    private _newValue;
    newValue: any;
}
