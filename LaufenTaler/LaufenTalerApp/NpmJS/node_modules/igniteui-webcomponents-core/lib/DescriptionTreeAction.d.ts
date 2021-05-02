import { Base, Type } from "./type";
import { DescriptionTreeActionType } from "./DescriptionTreeActionType";
import { DescriptionTreeNode } from "./DescriptionTreeNode";
import { TypeDescriptionMetadata } from "./TypeDescriptionMetadata";
import { TypeDescriptionPlatform } from "./TypeDescriptionPlatform";
/**
 * @hidden
 */
export declare class DescriptionTreeAction extends Base {
    static $t: Type;
    a: DescriptionTreeActionType;
    b: DescriptionTreeNode;
    c: TypeDescriptionMetadata;
    i: string;
    h(a: TypeDescriptionPlatform): string;
    g: any;
    f: any;
    e: number;
    d: number;
}
