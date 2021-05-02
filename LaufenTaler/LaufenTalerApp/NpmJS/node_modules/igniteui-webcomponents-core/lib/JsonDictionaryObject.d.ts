import { JsonDictionaryItem } from "./JsonDictionaryItem";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class JsonDictionaryObject extends JsonDictionaryItem {
    static $t: Type;
    private d;
    constructor();
    e(a: string, b: JsonDictionaryItem): void;
    g(a: string): void;
    f(): void;
    item(a: string, b?: JsonDictionaryItem): JsonDictionaryItem;
    c(a: string): boolean;
    a(): string[];
}
