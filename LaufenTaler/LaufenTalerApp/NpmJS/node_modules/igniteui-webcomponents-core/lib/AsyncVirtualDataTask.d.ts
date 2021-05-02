import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare class AsyncVirtualDataTask extends Base {
    static $t: Type;
    private _hasErrors;
    hasErrors: boolean;
    private _isRunning;
    isRunning: boolean;
    private _isCancelled;
    isCancelled: boolean;
    private _isCompleted;
    isCompleted: boolean;
    private _result;
    result: any;
    private _run;
    run: () => void;
}
