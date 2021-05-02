import { Base, Type } from "./type";
import { DescriptionTreeAction } from "./DescriptionTreeAction";
import { TypeDescriptionPlatform } from "./TypeDescriptionPlatform";
/**
 * @hidden
 */
export declare class TypeDescriptionPropretyTransforms extends Base {
    static $t: Type;
    private a;
    constructor();
    c(a: DescriptionTreeAction): string;
    e(a: DescriptionTreeAction): string;
    d(a: DescriptionTreeAction): string;
    f(a: DescriptionTreeAction): string;
    b(a: TypeDescriptionPlatform, b: any, c: DescriptionTreeAction): any;
}
