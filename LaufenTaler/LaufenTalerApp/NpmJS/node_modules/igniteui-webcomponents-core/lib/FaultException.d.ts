import { BaseError, Type } from "./type";
import { FaultCode } from "./FaultCode";
import { FaultReason } from "./FaultReason";
/**
 * @hidden
 */
export declare class FaultException extends BaseError {
    static $t: Type;
    constructor(a: FaultReason, b: FaultCode, c: string);
    private _action;
    action: string;
    private _code;
    code: FaultCode;
    private _reason;
    reason: FaultReason;
}
