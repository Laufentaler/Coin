import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare class Capture extends Base {
    static $t: Type;
    private readonly a;
    private readonly c;
    private readonly f;
    constructor(a: number, b: number, c: string);
    readonly b: number;
    readonly d: number;
    readonly g: string;
    toString(): string;
}
