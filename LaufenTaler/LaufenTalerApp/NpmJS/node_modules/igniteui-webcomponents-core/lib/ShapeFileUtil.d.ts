import { Base, Type } from "./type";
import { Header } from "./Header";
import { BinaryReader } from "./BinaryReader";
import { ShapefileRecord } from "./ShapefileRecord";
/**
 * @hidden
 */
export declare class ShapeFileUtil extends Base {
    static $t: Type;
    static a(a: BinaryReader, b: BinaryReader): Header;
    static e(a: Header, b: BinaryReader, c: BinaryReader): ShapefileRecord;
    private static l;
    private static k;
    private static i;
    private static d;
    private static c;
    private static b;
    private static h;
    private static f;
    private static g;
    private static j;
    private static m;
    static staticInit(): void;
}
