import { Base, IList$1, IComparable, Type } from "./type";
import { IIndexedPool$1 } from "./IIndexedPool$1";
/**
 * @hidden
 */
export declare class ArrayExtension extends Base {
    static $t: Type;
    static shuffle$1<T>($t: Type, a: IList$1<T>): void;
    static insertionIndex$1<T extends IComparable>($t: Type, a: IList$1<T>, b: T): number;
    static insertionIndex$11<T>($t: Type, a: IList$1<T>, b: (x: T, y: T) => number, c: T): number;
    static binarySearch$11<T>($t: Type, a: IList$1<T>, b: (arg1: T) => number): number;
    static binarySearch$1<T>($t: Type, a: IIndexedPool$1<T>, b: (arg1: T) => number): number;
    static getModulus$1<T>($t: Type, a: IList$1<T>, b: number): T;
}
