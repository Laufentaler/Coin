import { Base, Type } from "./type";
import { TypeDescriptionWellKnownType } from "./TypeDescriptionWellKnownType";
import { TypeDescriptionPlatform } from "./TypeDescriptionPlatform";
/**
 * @hidden
 */
export declare class TypeDescriptionMetadata extends Base {
    static $t: Type;
    private _owningType;
    owningType: string;
    private _propertyName;
    propertyName: string;
    private _knownType;
    knownType: TypeDescriptionWellKnownType;
    private _specificType;
    specificType: string;
    private _specificExternalType;
    specificExternalType: string;
    private _collectionElementType;
    collectionElementType: string;
    private c;
    private d;
    m(a: TypeDescriptionPlatform, b: string): void;
    static camelize(a: string): string;
    g(a: TypeDescriptionPlatform): string;
    static shouldCamelize(a: TypeDescriptionPlatform): boolean;
    h(a: TypeDescriptionPlatform): string;
}
