import { Stream, SeekOrigin, Type } from "./type";
/**
 * @hidden
 */
export declare class NullStream extends Stream {
    static $t: Type;
    protected get_canRead(): boolean;
    readonly canRead: boolean;
    protected get_canSeek(): boolean;
    readonly canSeek: boolean;
    protected get_canWrite(): boolean;
    readonly canWrite: boolean;
    protected get_length(): number;
    readonly length: number;
    protected get_position(): number;
    protected set_position(a: number): void;
    position: number;
    flush(): void;
    read(a: number[], b: number, c: number): number;
    readByte(): number;
    seek(a: number, b: SeekOrigin): number;
    setLength(a: number): void;
    write(a: number[], b: number, c: number): void;
    writeByte(a: number): void;
}
