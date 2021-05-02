import { Base, Type } from "./type";
import { Color } from "./Color";
import { InterpolationMode } from "./InterpolationMode";
import { Brush } from "./Brush";
/**
 * @hidden
 */
export declare class ColorUtil extends Base {
    static $t: Type;
    private static f;
    static p(a: number): Color;
    static q(a: Color): Color;
    static n(a: Color, interpolation_: number, maximum_: Color, b: InterpolationMode): Color;
    static l(a: number[], b: number, c: number[]): Color;
    static o(a: Color, b: number): Color;
    static a(a: Color): number[];
    static b(a: Color): number[];
    static h(a: number, b: number, c: number, d: number): Color;
    static i(a: number, b: number, c: number, d: number): Color;
    private static d;
    private static c;
    static e(a: Color): number;
    static m(a: Brush): Color;
    static k(a: string): Color;
    static j(a: Brush): Color;
    static g(a: Color): Brush;
}
