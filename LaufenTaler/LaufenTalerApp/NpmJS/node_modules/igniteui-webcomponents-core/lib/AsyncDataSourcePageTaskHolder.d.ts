import { Base, Type } from "./type";
import { AsyncVirtualDataTask } from "./AsyncVirtualDataTask";
/**
 * @hidden
 */
export declare class AsyncDataSourcePageTaskHolder extends Base {
    static $t: Type;
    private _task;
    task: AsyncVirtualDataTask;
}
