import { Base, Point, Type } from "./type";
import { Size } from "./Size";
/**
 * @hidden
 */
export declare class Rect extends Base {
    static $t: Type;
    constructor(a: number, b: number, c: number, d: number, e: number);
    constructor(a: number, b: number, c: number, d: Size);
    constructor(a: number, b: Point, c: Point);
    constructor(a: number, b: Point, c: Size);
    constructor(a: number);
    constructor(a: number, ..._rest: any[]);
    private s;
    x: number;
    private t;
    y: number;
    private r;
    width: number;
    private n;
    height: number;
    private q;
    top: number;
    private o;
    left: number;
    private p;
    right: number;
    private m;
    bottom: number;
    readonly isEmpty: boolean;
    static readonly empty: Rect;
    equals1(a: Rect): boolean;
    private d;
    containsLocation(a: number, b: number): boolean;
    containsPoint(a: Point): boolean;
    containsRect(a: Rect): boolean;
    inflate(a: number, b: number): void;
    private af;
    intersectsWith(a: Rect): boolean;
    intersect(a: Rect): void;
    union(a: Rect): void;
    equals(a: any): boolean;
    getHashCode(): number;
    copy(): Rect;
    static l_op_Equality(a: Rect, b: Rect): boolean;
    static l_op_Inequality(a: Rect, b: Rect): boolean;
}
