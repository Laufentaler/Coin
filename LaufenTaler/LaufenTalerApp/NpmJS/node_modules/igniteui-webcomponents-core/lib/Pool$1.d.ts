import { Base, Type } from "./type";
import { IIndexedPool$1 } from "./IIndexedPool$1";
import { List$1 } from "./List$1";
/**
 * @hidden
 */
export declare class Pool$1<T> extends Base implements IIndexedPool$1<T> {
    static $t: Type;
    protected $t: Type;
    constructor($t: Type);
    private _create;
    create: () => T;
    private _disactivate;
    disactivate: (arg1: T) => void;
    private _activate;
    activate: (arg1: T) => void;
    private _destroy;
    destroy: (arg1: T) => void;
    item(a: number): T;
    clear(): void;
    count: number;
    a: List$1<T>;
    b: List$1<T>;
    c(a: (arg1: T) => void): void;
}
