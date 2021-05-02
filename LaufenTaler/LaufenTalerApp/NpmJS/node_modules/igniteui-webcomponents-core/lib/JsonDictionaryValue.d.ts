import { JsonDictionaryItem } from "./JsonDictionaryItem";
import { Type } from "./type";
import { JsonDictionaryValueType } from "./JsonDictionaryValueType";
/**
 * @hidden
 */
export declare class JsonDictionaryValue extends JsonDictionaryItem {
    static $t: Type;
    constructor();
    private _value;
    value: any;
    a: JsonDictionaryValueType;
}
