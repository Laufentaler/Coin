import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare abstract class DecoderFallbackBuffer extends Base {
    static $t: Type;
    constructor();
    abstract readonly d: number;
    abstract a(a: number[], b: number): boolean;
    abstract c(): string;
    abstract b(): boolean;
    e(): void;
}
