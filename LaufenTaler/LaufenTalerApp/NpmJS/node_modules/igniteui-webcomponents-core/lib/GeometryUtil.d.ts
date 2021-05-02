import { Base, Point, IList$1, Type } from "./type";
import { Rect } from "./Rect";
import { Tuple$2 } from "./Tuple$2";
/**
 * @hidden
 */
export declare class GeometryUtil extends Base {
    static $t: Type;
    static g(a: number): number;
    static c(a: number): number;
    static h(a: Point, b: Point): number;
    static d(a: Rect): number;
    static n(a: number, b: number, c: Point, d: number, e: number): Point;
    static j(a: number, b: number, c: boolean, d: number, e: number): Point;
    static k(a: Point, b: number, c: number): Point;
    static m(a: Point, b: Point, c: number): Point;
    static f(a: Point, b: Point): number;
    static l(a: Point, b: Point, c: number, d: boolean, e: boolean): Point;
    static e(a: Point, b: Point): number;
    static i(a: Point, b: Point, c: Point, d: number): Tuple$2<Point, Point>;
    static a(a: Point, b: Point, c: Point, d: number): boolean;
    static b(a: Point, b: Point, c: IList$1<Point>, d: number): boolean;
}
