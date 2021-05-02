import { Description } from "./Description";
import { FinancialCalculationDataSourceDescription } from "./FinancialCalculationDataSourceDescription";
import { FinancialCalculationSupportingCalculationsDescription } from "./FinancialCalculationSupportingCalculationsDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class FinancialEventArgsDescription extends Description {
    static $t: Type;
    protected get_type(): string;
    readonly type: string;
    constructor();
    private k;
    position: number;
    private j;
    count: number;
    private f;
    dataSource: FinancialCalculationDataSourceDescription;
    private h;
    supportingCalculations: FinancialCalculationSupportingCalculationsDescription;
}
