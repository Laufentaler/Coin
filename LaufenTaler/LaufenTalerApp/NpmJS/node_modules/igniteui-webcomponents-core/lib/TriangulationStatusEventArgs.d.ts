import { EventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class TriangulationStatusEventArgs extends EventArgs {
    static $t: Type;
    private _currentStatus;
    currentStatus: number;
    constructor(a: number);
}
