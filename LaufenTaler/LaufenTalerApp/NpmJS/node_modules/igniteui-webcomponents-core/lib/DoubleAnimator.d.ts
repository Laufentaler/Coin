import { Base, INotifyPropertyChanged, PropertyChangedEventArgs, Type } from "./type";
import { DomRenderer } from "./dom";
/**
 * @hidden
 */
export declare class DoubleAnimator extends Base implements INotifyPropertyChanged {
    static $t: Type;
    protected get_g(): boolean;
    readonly g: boolean;
    u(a: DomRenderer): void;
    t(): void;
    private k;
    o: number;
    private p;
    r: number;
    private a;
    b: (time: number) => number;
    private i;
    private j;
    protected l: number;
    protected n: number;
    constructor(a: number, b: number, c: number);
    private s;
    private _requestAnimationFrame;
    private requestAnimationFrame;
    private d;
    protected e: boolean;
    v(): void;
    w(): void;
    private h;
    private q;
    x(): void;
    private y;
    m(): number;
    f(): boolean;
    propertyChanged: (sender: any, e: PropertyChangedEventArgs) => void;
}
