import { EventArgs, BaseError, Type } from "./type";
/**
 * @hidden
 */
export declare class AsyncCompletedEventArgs extends EventArgs {
    static $t: Type;
    private d;
    private b;
    private f;
    constructor(a: BaseError, b: boolean, c: any);
    readonly error: BaseError;
    readonly cancelled: boolean;
    readonly userState: any;
    protected h(): void;
}
