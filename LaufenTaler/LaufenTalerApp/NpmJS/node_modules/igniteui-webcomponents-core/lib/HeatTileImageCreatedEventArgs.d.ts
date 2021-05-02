import { TileImageCreatedEventArgs } from "./TileImageCreatedEventArgs";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class HeatTileImageCreatedEventArgs extends TileImageCreatedEventArgs {
    static $t: Type;
    private _globalMinimumValue;
    globalMinimumValue: number;
    private _globalMaximumValue;
    globalMaximumValue: number;
    private _globalMaximumValueLongitude;
    globalMaximumValueLongitude: number;
    private _globalMaximumValueLatitude;
    globalMaximumValueLatitude: number;
    private _globalMinimumValueLongitude;
    globalMinimumValueLongitude: number;
    private _globalMinimumValueLatitude;
    globalMinimumValueLatitude: number;
}
