import { Base, Type } from "./type";
import { AsyncDataSourcePageTaskHolder } from "./AsyncDataSourcePageTaskHolder";
/**
 * @hidden
 */
export declare class AsyncDataSourcePageRequest extends Base {
    static $t: Type;
    private e;
    private f;
    private a;
    private c;
    constructor(a: number, b: number);
    index: number;
    retryDelay: number;
    taskHolder: AsyncDataSourcePageTaskHolder;
    isDone: boolean;
}
