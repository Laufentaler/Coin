import { Base, Type } from "./type";
import { Binding } from "./Binding";
/**
 * @hidden
 */
export declare class DependencyObject extends Base {
    static $t: Type;
    constructor();
    private localValues;
    private a;
    c(a: DependencyProperty): any;
    h(dp_: DependencyProperty, a: any): void;
    f(a: DependencyProperty): void;
    e(a: DependencyProperty): any;
    g(a: DependencyProperty, b: Binding): void;
    getValueAlt(a: DependencyProperty): any;
    setValueAlt(dp_: DependencyProperty, a: any): void;
}
/**
 * @hidden
 */
export declare class DependencyProperty extends Base {
    static $t: Type;
    readonly _name: string;
    private readonly f;
    private readonly k;
    static readonly c: any;
    readonly a: boolean;
    readonly b: boolean;
    constructor(a: string, b: Type, c: PropertyMetadata);
    readonly l: PropertyMetadata;
    readonly propertyType: Type;
    readonly name: string;
    static i(a: string, b: Type, c: Type, d: PropertyMetadata): DependencyProperty;
    static h(a: string, b: Type): DependencyProperty;
    static registerAlt(a: string, b: Type, c: Type, d: PropertyMetadata): DependencyProperty;
}
/**
 * @hidden
 */
export declare class DependencyPropertiesCollection extends Base {
    static $t: Type;
    private a;
    private static b;
    static readonly c: DependencyPropertiesCollection;
    constructor();
    d(a: string): DependencyProperty;
    e(a: string, b: Type, c: Type, d: PropertyMetadata): DependencyProperty;
}
/**
 * @hidden
 */
export declare class DependencyPropertyChangedEventArgs extends Base {
    static $t: Type;
    private a;
    private b;
    constructor(a: DependencyProperty, b: any, c: any);
    private e;
    f: DependencyProperty;
    readonly newValue: any;
    readonly oldValue: any;
}
/**
 * @hidden
 */
export declare class PropertyMetadata extends Base {
    static $t: Type;
    private a;
    b: any;
    private c;
    d: (d: DependencyObject, e: DependencyPropertyChangedEventArgs) => void;
    constructor(a: number, b: any);
    constructor(a: number, b: (d: DependencyObject, e: DependencyPropertyChangedEventArgs) => void);
    constructor(a: number, b: any, c: (d: DependencyObject, e: DependencyPropertyChangedEventArgs) => void);
    constructor(a: number, ..._rest: any[]);
    static createWithCallback(a: (d: DependencyObject, e: DependencyPropertyChangedEventArgs) => void): PropertyMetadata;
    static createWithDefaultAndCallback(a: any, b: (d: DependencyObject, e: DependencyPropertyChangedEventArgs) => void): PropertyMetadata;
}
