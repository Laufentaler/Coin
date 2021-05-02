import { Base, IEnumerable$1, Type } from "./type";
import { IHashPool$2 } from "./IHashPool$2";
import { List$1 } from "./List$1";
import { Dictionary$2 } from "./Dictionary$2";
/**
 * @hidden
 */
export declare class HashPool$2<TKey, TValue> extends Base implements IHashPool$2<TKey, TValue> {
    static $t: Type;
    protected $tKey: Type;
    protected $tValue: Type;
    protected d: List$1<TValue>;
    protected b: Dictionary$2<TKey, TValue>;
    constructor($tKey: Type, $tValue: Type);
    private _create;
    create: () => TValue;
    private _disactivate;
    disactivate: (arg1: TValue) => void;
    private _activate;
    activate: (arg1: TValue) => void;
    private _destroy;
    destroy: (arg1: TValue) => void;
    item(a: TKey): TValue;
    readonly c: IEnumerable$1<TKey>;
    a(a: TKey): boolean;
    g(a: TKey): void;
    clear(): void;
    readonly e: number;
    f(a: (arg1: TValue) => void): void;
}
