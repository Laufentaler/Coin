import { Base, Type } from "./type";
import { Description } from "./Description";
/**
 * @hidden
 */
export declare class DescriptionResult extends Base {
    static $t: Type;
    private c;
    constructor();
    d(a: string): void;
    e(a: DescriptionResult): void;
    private _result;
    result: Description;
    readonly warnings: string[];
}
