import { Base, Type } from "./type";
import { UriKind } from "./UriKind";
/**
 * @hidden
 */
export declare class Uri extends Base {
    static $t: Type;
    constructor(a: number, b: string);
    constructor(a: number, b: string, c: UriKind);
    constructor(a: number, b: string, c: UriKind, d: boolean);
    constructor(a: number, b: Uri, c: string);
    constructor(a: number, ..._rest: any[]);
    private _value;
    value: string;
    readonly isAbsoluteUri: boolean;
    readonly scheme: string;
    static encodeURIComponent(a: string): string;
    static escapeUriString(a: string): string;
    static tryCreate(a: string, b: UriKind, c: Uri): {
        ret: boolean;
        p2: Uri;
    };
    static isWellFormedUriString(a: string, b: UriKind): boolean;
    toString(): string;
    static readonly schemeDelimiter: string;
    readonly absolutePath: string;
    readonly absoluteUri: string;
    readonly localPath: string;
    readonly originalString: string;
    isWellFormedOriginalString(): boolean;
}
