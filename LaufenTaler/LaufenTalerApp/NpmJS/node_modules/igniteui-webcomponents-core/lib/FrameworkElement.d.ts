import { UIElement } from "./UIElement";
import { Visibility } from "./Visibility";
import { Type } from "./type";
import { Style } from "./Style";
/**
 * @hidden
 */
export declare class FrameworkElement extends UIElement {
    static $t: Type;
    constructor();
    private _name;
    name: string;
    m: number;
    l: number;
    _visibility: Visibility;
    visibility: Visibility;
    protected w(a: Visibility, b: Visibility): void;
    private _width;
    width: number;
    private _height;
    height: number;
    o: number;
    n: number;
    s: number;
    x: FrameworkElement;
    private _dataContext;
    dataContext: any;
    _opacity: number;
    opacity: number;
    protected v(): void;
    y: Style;
}
