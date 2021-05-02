import { EventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class ErrorMessageDisplayingEventArgs extends EventArgs {
    static $t: Type;
    constructor(a: string);
    private b;
    errorMessage: string;
}
