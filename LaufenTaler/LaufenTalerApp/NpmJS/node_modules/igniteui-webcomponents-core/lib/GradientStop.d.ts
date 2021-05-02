import { Base, Type } from "./type";
import { Color } from "./Color";
/**
 * @hidden
 */
export declare class GradientStop extends Base {
    static $t: Type;
    constructor();
    offset: number;
    clone(): GradientStop;
    _fill: string;
    fill: string;
    private d;
    private g;
    color: Color;
    equals(a: any): boolean;
    getHashCode(): number;
}
