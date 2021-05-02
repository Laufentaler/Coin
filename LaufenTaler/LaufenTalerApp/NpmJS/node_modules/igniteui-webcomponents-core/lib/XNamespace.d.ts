import { Base, Type } from "./type";
/**
 * @hidden
 */
export declare class XNamespace extends Base {
    static $t: Type;
    private a;
    constructor(a: string);
    static get(a: string): XNamespace;
    static readonly xmlns: XNamespace;
    readonly namespaceName: string;
}
