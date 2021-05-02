import { Stream, SeekOrigin, Type } from "./type";
/**
 * @hidden
 */
export declare class MemoryStream extends Stream {
    static $t: Type;
    private o;
    private t;
    private s;
    private r;
    constructor(a: number);
    constructor(a: number, b: number);
    constructor(a: number, b: number[]);
    constructor(a: number, ..._rest: any[]);
    protected get_canRead(): boolean;
    readonly canRead: boolean;
    protected get_canSeek(): boolean;
    readonly canSeek: boolean;
    protected get_canWrite(): boolean;
    readonly canWrite: boolean;
    protected get_capacity(): number;
    protected set_capacity(a: number): void;
    capacity: number;
    protected get_length(): number;
    readonly length: number;
    protected get_position(): number;
    protected set_position(a: number): void;
    position: number;
    protected disposeCore(a: boolean): void;
    flush(): void;
    getBuffer(): number[];
    read(a: number[], b: number, c: number): number;
    readByte(): number;
    seek(a: number, b: SeekOrigin): number;
    setLength(a: number): void;
    toArray(): number[];
    write(a: number[], b: number, c: number): void;
    writeByte(a: number): void;
    writeTo(a: Stream): void;
}
