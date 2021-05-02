import { Stream, SeekOrigin, Type } from "./type";
import { Encoding } from "./Encoding";
/**
 * @hidden
 */
export declare class XmlInputStream extends Stream {
    static $t: Type;
    static strictUTF8: Encoding;
    static staticInit(): void;
    private w;
    private t;
    private o;
    private p;
    private q;
    private static z;
    constructor(a: Stream);
    private u;
    private y;
    private r;
    private s;
    readonly actualEncoding: Encoding;
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
    close(): void;
    flush(): void;
    read(a: number[], b: number, c: number): number;
    readByte(): number;
    seek(a: number, b: SeekOrigin): number;
    setLength(a: number): void;
    write(a: number[], b: number, c: number): void;
}
