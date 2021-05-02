import { Base, Type } from "./type";
import { Rectangle } from "./Rectangle";
import { Path } from "./Path";
import { Geometry } from "./Geometry";
import { TextBlock } from "./TextBlock";
import { Polygon } from "./Polygon";
import { Polyline } from "./Polyline";
import { DataTemplateRenderInfo } from "./DataTemplateRenderInfo";
import { ContentControl } from "./ContentControl";
import { Transform } from "./Transform";
import { Line } from "./Line";
import { Rect } from "./Rect";
import { Shape } from "./Shape";
import { Style } from "./Style";
import { DomRenderer } from "./dom";
import { FrameworkElement } from "./FrameworkElement";
/**
 * @hidden
 */
export interface IRenderer {
    h$t(a: Rectangle): void;
    h$q(a: Path): void;
    h$o(a: Geometry): void;
    h$u(a: TextBlock): void;
    h$r(a: Polygon): void;
    h$s(a: Polyline): void;
    h$n(a: DataTemplateRenderInfo, b: ContentControl): void;
    h$h(a: Transform): void;
    h$p(a: Line): void;
    h$d: any;
    h$x(): void;
    h$y(a: number, b: number): void;
    h$ad(a: number, b: number): void;
    h$k(a: any, b: number, c: number, d: number, e: number, f: number): void;
    h$l(a: any, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): void;
    h$ac(a: Rect): void;
    h$w(): void;
    h$i(a: number, b: number, c: number, d: number): void;
    h$a(a: number, b: number): number[];
    h$z(a: string): void;
    h$aa(a: FontInfo): void;
    h$f(): string;
    h$b(): FontInfo;
    h$c(a: string): number;
    h$ab(a: number): void;
    h$e(): any;
    h$g(a: Shape, b: Style): void;
    h$m(a: string, b: number, c: number, d: number): void;
    h$j(): void;
    h$v(a: TextBlock, b: Rect, c: number): void;
}
/**
 * @hidden
 */
export declare let IRenderer_$type: Type;
/**
 * @hidden
 */
export declare class FontInfo extends Base {
    static $t: Type;
    t(a: DomRenderer): void;
    constructor();
    private f;
    readonly g: number;
    private k;
    q: string;
    private u;
    private l;
    r: string;
    private m;
    s: string;
    private b;
    d: number;
    private c;
    e: number;
    private h;
    n: string;
    private i;
    o: string;
    private j;
    fontString: string;
    a(): FontInfo;
}
/**
 * @hidden
 */
export declare class FontUtil extends Base {
    static $t: Type;
    static getCurrentFontHeight(a: DomRenderer, b: FontInfo): number;
    static measureStringHeight(a: DomRenderer, b: string, c: FontInfo): number;
    static measureStringWidth1(a: string, b: string, c: RenderingContext): number;
    static measureStringWidth(a: string, b: FontInfo, c: RenderingContext): number;
    private static a;
    static getDefaultFont(a: DomRenderer): FontInfo;
    static getFontSize(a: FontInfo): number;
    static getFontWithNewFontSize(a: FontInfo, b: number): FontInfo;
    static getFontInfoFromString(a: DomRenderer, b: string): FontInfo;
    static getFontForClass(a: DomRenderer, b: string): FontInfo;
    static getFont(a: DomRenderer): FontInfo;
    static updateFontString(a: FontInfo): void;
    static getFontInfo(a: DomRenderer, b: FrameworkElement, c: FontInfo): FontInfo;
    private static p;
    static toFontInfo(a: DomRenderer, b: string): FontInfo;
    static interpolateFont(a: FontInfo, b: number, c: FontInfo, d: FontInfo): void;
    static charsEqual(a: string, b: number, c: string[], d: number): boolean;
    private static o;
}
/**
 * @hidden
 */
export declare class RenderingContext extends Base {
    static $t: Type;
    private c;
    g(): any;
    constructor(a: IRenderer, b: any);
    readonly d: boolean;
    v(a: Rectangle): void;
    s(a: Path): void;
    q(a: Geometry): void;
    w(a: TextBlock): void;
    x(a: TextBlock, b: Rect, c: number): void;
    t(a: Polygon): void;
    u(a: Polyline): void;
    p(a: DataTemplateRenderInfo, b: ContentControl): void;
    j(a: Transform): void;
    r(a: Line): void;
    z(): void;
    y(): void;
    ae(a: Rect): void;
    aa(a: number, b: number): void;
    af(a: number, b: number): void;
    k(a: number, b: number, c: number, d: number): void;
    n(a: any, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): void;
    m(a: any, b: number, c: number, d: number, e: number, f: number): void;
    a(a: number, b: number): number[];
    h(): string;
    b(): FontInfo;
    ab(a: string): void;
    ac(a: FontInfo): void;
    f(a: string): number;
    e(a: TextBlock): number;
    ad(a: number): void;
    i(a: Shape, b: Style): void;
    o(a: string, b: number, c: number, d: number): void;
    l(): void;
}
