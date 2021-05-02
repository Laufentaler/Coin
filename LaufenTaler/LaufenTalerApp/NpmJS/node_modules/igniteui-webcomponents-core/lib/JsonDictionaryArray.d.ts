import { JsonDictionaryItem } from "./JsonDictionaryItem";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class JsonDictionaryArray extends JsonDictionaryItem {
    static $t: Type;
    private _items;
    items: JsonDictionaryItem[];
}
