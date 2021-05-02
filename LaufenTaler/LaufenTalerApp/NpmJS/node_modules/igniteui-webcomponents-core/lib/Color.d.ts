import { ValueType, Nullable$1, Type } from "./type";
/**
 * @hidden
 */
export declare class Color extends ValueType {
    static $t: Type;
    constructor();
    private _a;
    l: number;
    private _r;
    o: number;
    private _g;
    n: number;
    private _b;
    m: number;
    private _colorString;
    colorString: string;
    private a;
    static create(a: any): Color;
    private s;
    private r;
    static u(a_: number, r_: number, g_: number, b_: number): Color;
    equals(a: any): boolean;
    getHashCode(): number;
    static d(a: Color, b: Color): boolean;
    static e(a: Nullable$1<Color>, b: Nullable$1<Color>): boolean;
    static b(a: Color, b: Color): boolean;
    static c(a: Nullable$1<Color>, b: Nullable$1<Color>): boolean;
}
