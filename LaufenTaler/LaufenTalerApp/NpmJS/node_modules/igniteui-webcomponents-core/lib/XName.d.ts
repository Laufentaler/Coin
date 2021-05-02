import { Base, Type } from "./type";
import { XNamespace } from "./XNamespace";
/**
 * @hidden
 */
export declare class XName extends Base {
    static $t: Type;
    private a;
    private b;
    constructor(a: string, b: string);
    readonly localName: string;
    readonly namespaceName: string;
    readonly namespace: XNamespace;
    static get(a: string, b: string): XName;
}
