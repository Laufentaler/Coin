import { Description } from "./Description";
import { CalculatedColumnDescription } from "./CalculatedColumnDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class FinancialCalculationDataSourceDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private h;
    typicalColumn: CalculatedColumnDescription;
    private g;
    trueRange: CalculatedColumnDescription;
    private f;
    trueLow: CalculatedColumnDescription;
    private x;
    period: number;
    private y;
    shortPeriod: number;
    private w;
    longPeriod: number;
    private v;
    count: number;
    private u;
    calculateFrom: number;
    private t;
    calculateCount: number;
    private p;
    multiplier: number;
    private o;
    minimumValue: number;
    private n;
    maximumValue: number;
    private l;
    specifiesRange: boolean;
}
