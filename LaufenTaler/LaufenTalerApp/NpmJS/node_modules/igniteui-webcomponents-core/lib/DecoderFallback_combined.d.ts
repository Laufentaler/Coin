import { Base, Type } from "./type";
import { DecoderFallbackBuffer } from "./DecoderFallbackBuffer";
/**
 * @hidden
 */
export declare abstract class DecoderFallback extends Base {
    static $t: Type;
    private static b;
    private static d;
    private static f;
    static staticInit(): void;
    constructor();
    static readonly c: DecoderFallback;
    abstract readonly a: number;
    static readonly e: DecoderFallback;
    static readonly g: DecoderFallback;
    abstract h(): DecoderFallbackBuffer;
}
/**
 * @hidden
 */
export declare class DecoderExceptionFallback extends DecoderFallback {
    static $t: Type;
    constructor();
    protected get_a(): number;
    readonly a: number;
    h(): DecoderFallbackBuffer;
    equals(a: any): boolean;
    getHashCode(): number;
}
/**
 * @hidden
 */
export declare class DecoderReplacementFallback extends DecoderFallback {
    static $t: Type;
    constructor(a: number);
    constructor(a: number, b: string);
    constructor(a: number, ..._rest: any[]);
    private j;
    readonly i: string;
    protected get_a(): number;
    readonly a: number;
    h(): DecoderFallbackBuffer;
    equals(a: any): boolean;
    getHashCode(): number;
}
/**
 * @hidden
 */
export declare class DecoderReplacementFallbackBuffer extends DecoderFallbackBuffer {
    static $t: Type;
    private f;
    private g;
    private h;
    constructor(a: DecoderReplacementFallback);
    protected get_d(): number;
    readonly d: number;
    a(a: number[], b: number): boolean;
    c(): string;
    b(): boolean;
    e(): void;
}
