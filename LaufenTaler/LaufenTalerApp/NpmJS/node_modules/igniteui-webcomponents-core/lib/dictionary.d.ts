import { IEnumerator } from "./type";
export declare class DictionaryUtil {
    static dictionaryCreate(capacity?: number): Map<string, any>;
    static en(map: Map<string, any>): IterableIterator<{
        key: string;
        value: any;
    }>;
    static dictionaryGetEnumerator(map: Map<string, any>): IEnumerator;
    static dictionaryGetKeys(map: Map<string, any>): IEnumerator;
    static dictionaryGetValues(map: Map<string, any>): IEnumerator;
    static dictionaryGetDictionary(obj: any): Map<string, any>;
}
