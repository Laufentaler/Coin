import { Base, Type } from "./type";
import { XmlNode, XmlNodeType } from "./xml";
/**
 * @hidden
 */
export declare abstract class XObject extends Base {
    static $t: Type;
    constructor(a: XmlNode);
    private _backingNode;
    protected backingNode: XmlNode;
    abstract readonly nodeType: XmlNodeType;
    toString(): string;
}
