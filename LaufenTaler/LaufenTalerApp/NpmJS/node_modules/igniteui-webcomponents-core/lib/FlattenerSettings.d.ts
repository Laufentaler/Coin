import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare class FlattenerSettings extends Base {
    static $t: Type;
    constructor();
    private static a;
    static readonly instance: FlattenerSettings;
    private _chunkingAmount;
    chunkingAmount: number;
}
