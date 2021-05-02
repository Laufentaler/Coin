import { Base, Type } from "./type";
import { List$1 } from "./List$1";
import { ISchedulableRender } from "./ISchedulableRender";
import { DomRenderer } from "./dom";
import { RenderingContext } from "./RenderingContext";
/**
 * @hidden
 */
export declare class CanvasRenderScheduler extends Base {
    static $t: Type;
    constructor();
    private b;
    protected f: List$1<ISchedulableRender>;
    e: List$1<CanvasRenderScheduler>;
    l(a: ISchedulableRender): void;
    r(a: ISchedulableRender): void;
    p(): void;
    readonly d: boolean;
    private a;
    private h;
    private g;
    j(a: DomRenderer): void;
    n(): void;
    o(a: RenderingContext, b: RenderingContext): void;
    i(): void;
    k(): void;
    private m;
    private q;
    c: boolean;
}
