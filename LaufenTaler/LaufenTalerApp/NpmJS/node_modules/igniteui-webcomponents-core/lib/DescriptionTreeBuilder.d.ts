import { Base, Type } from "./type";
import { List$1 } from "./List$1";
import { DescriptionTreeNode } from "./DescriptionTreeNode";
import { TypeDescriptionContext } from "./TypeDescriptionContext";
import { Description } from "./Description";
/**
 * @hidden
 */
export declare class DescriptionTreeBuilder extends Base {
    static $t: Type;
    static b(item_: any): List$1<string>;
    static createTree(a: TypeDescriptionContext, description_: Description): DescriptionTreeNode;
    private static c;
}
