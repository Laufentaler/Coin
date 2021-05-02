import { ValueType, Nullable$1, Type } from "./type";
/**
 * @hidden
 */
export declare class Size extends ValueType {
    static $t: Type;
    constructor(a: number, b: number, c: number);
    constructor();
    constructor(a: number, ..._rest: any[]);
    equals(a: any): boolean;
    getHashCode(): number;
    private i;
    private h;
    width: number;
    height: number;
    readonly isEmpty: boolean;
    static readonly empty: Size;
    static l_op_Inequality(a: Size, b: Size): boolean;
    static l_op_Inequality_Lifted(a: Nullable$1<Size>, b: Nullable$1<Size>): boolean;
    static l_op_Equality(a: Size, b: Size): boolean;
    static l_op_Equality_Lifted(a: Nullable$1<Size>, b: Nullable$1<Size>): boolean;
}
