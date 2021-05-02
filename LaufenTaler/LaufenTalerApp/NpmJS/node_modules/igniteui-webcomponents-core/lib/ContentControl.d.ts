import { Control } from "./Control";
import { Type } from "./type";
import { DataTemplate } from "./DataTemplate";
/**
 * @hidden
 */
export declare class ContentControl extends Control {
    static $t: Type;
    private _content;
    content: any;
    ah: DataTemplate;
}
