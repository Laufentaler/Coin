import { Base, IList$1, Type } from "./type";
import { DataSeriesAxisType } from "./DataSeriesAxisType";
import { DataSeriesType } from "./DataSeriesType";
import { DataSeriesMarker } from "./DataSeriesMarker";
import { DataSeriesMemberPathHint } from "./DataSeriesMemberPathHint";
import { DataSeriesIntent } from "./DataSeriesIntent";
/**
 * @hidden
 */
export declare class DataSeries extends Base {
    static $t: Type;
    constructor();
    private j;
    private _name;
    name: string;
    private _title;
    title: string;
    private _data;
    data: any;
    private _priority;
    priority: number;
    private _index;
    index: number;
    private _suggestedPrimaryAxis;
    suggestedPrimaryAxis: DataSeriesAxisType;
    private _suggestedSecondaryAxis;
    suggestedSecondaryAxis: DataSeriesAxisType;
    private _suggestedSeries;
    suggestedSeries: DataSeriesType;
    private _dataPath;
    dataPath: string;
    private _suggestedMarker;
    suggestedMarker: DataSeriesMarker;
    addMemberPathHint(a: DataSeriesMemberPathHint): void;
    addMemberPathHint1(a: DataSeriesMemberPathHint, b: DataSeriesIntent): void;
    addMemberPathHint2(a: string, b: DataSeriesIntent): void;
    removeMemberPathHint(a: DataSeriesMemberPathHint): void;
    clearMemberPathHints(): void;
    getMemberPathHintCount(): number;
    getMemberPathHintAt(a: number): DataSeriesMemberPathHint;
    findMatchingHint(a: DataSeriesIntent): DataSeriesMemberPathHint;
    getMemberPathFor(a: DataSeriesIntent): string;
    hasMatchingHint(a: DataSeriesIntent): boolean;
    i(): IList$1<DataSeriesMemberPathHint>;
    equals(a: any): boolean;
    toString(): string;
}
