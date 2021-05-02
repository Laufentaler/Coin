import { Base, Type } from "./type";
import { DataSeriesIntent } from "./DataSeriesIntent";
import { List$1 } from "./List$1";
/**
 * @hidden
 */
export declare class DataSeriesMemberPathHint extends Base {
    static $t: Type;
    private _path;
    path: string;
    private _intent;
    intent: DataSeriesIntent;
    equals(a: any): boolean;
    toString(): string;
    update1(a: string, b?: string): void;
    update(a: List$1<string>, b?: string): void;
    hasPath(): boolean;
    clone(): DataSeriesMemberPathHint;
}
