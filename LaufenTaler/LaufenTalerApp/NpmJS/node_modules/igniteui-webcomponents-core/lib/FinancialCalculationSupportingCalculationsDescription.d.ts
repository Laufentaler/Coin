import { Description } from "./Description";
import { ColumnSupportingCalculationDescription } from "./ColumnSupportingCalculationDescription";
import { DataSourceSupportingCalculationDescription } from "./DataSourceSupportingCalculationDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class FinancialCalculationSupportingCalculationsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private f;
    eMA: ColumnSupportingCalculationDescription;
    private h;
    sMA: ColumnSupportingCalculationDescription;
    private i;
    sTDEV: ColumnSupportingCalculationDescription;
    private g;
    movingSum: ColumnSupportingCalculationDescription;
    private q;
    shortVolumeOscillatorAverage: DataSourceSupportingCalculationDescription;
    private o;
    longVolumeOscillatorAverage: DataSourceSupportingCalculationDescription;
    private p;
    shortPriceOscillatorAverage: DataSourceSupportingCalculationDescription;
    private n;
    longPriceOscillatorAverage: DataSourceSupportingCalculationDescription;
    private v;
    makeSafeRef: string;
}
