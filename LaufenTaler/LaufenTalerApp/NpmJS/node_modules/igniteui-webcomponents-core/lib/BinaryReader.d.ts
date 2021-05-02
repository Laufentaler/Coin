import { Base, IDisposable, Stream, Type } from "./type";
/**
 * @hidden
 */
export declare class BinaryReader extends Base implements IDisposable {
    static $t: Type;
    private _data;
    private d;
    private n;
    readonly canRead: boolean;
    readonly currentPosition: number;
    readonly length: number;
    private e;
    private f;
    constructor(a: number, b: string, c: boolean);
    constructor(a: number, b: Stream);
    constructor(a: number, ..._rest: any[]);
    private i;
    private a;
    private b;
    readByte(): number;
    readBytes(a: number): number[];
    readUInt32(): number;
    readUInt16(): number;
    readInt32(): number;
    readDouble(): number;
    readSingle(): number;
    private _stream;
    protected get_baseStream(): Stream;
    readonly baseStream: Stream;
    readBoolean(): boolean;
    readInt16(): number;
    readSByte(): number;
    close(): void;
    dispose(): void;
}
