import { Type, Base, IEnumerable, INotifyPropertyChanged, PropertyChangedEventArgs } from "./type";
import { DataSeriesCollection } from "./DataSeriesCollection";
import { IDataSourceLocalDataProvider } from "./IDataSourceLocalDataProvider";
import { DataSeriesType } from "./DataSeriesType";
import { DataSeries } from "./DataSeries";
import { IDataSourceDataProviderUpdateNotifier } from "./IDataSourceDataProviderUpdateNotifier";
import { ObservableCollection$1 } from "./ObservableCollection$1";
import { IExternalDataSeriesAdapter } from "./IExternalDataSeriesAdapter";
/**
 * @hidden
 */
export interface IDataSeriesAdapterRule {
    evaluate(a: DataSeriesAdapterRunContext): void;
    readonly priority: number;
}
/**
 * @hidden
 */
export declare let IDataSeriesAdapterRule_$type: Type;
/**
 * @hidden
 */
export declare class DataSeriesAdapterRunContext extends Base {
    static $t: Type;
    private g;
    private _analyzer;
    analyzer: DataSeriesDataProviderAnalyzer;
    constructor(a: any);
    private h;
    getSubProvider(a: any, b: string): IDataSourceLocalDataProvider;
    popSubProvider(): void;
    w(a: string, b: string): string;
    recurseRules(a: any, b: string, c: boolean): void;
    private m;
    private o;
    private n;
    private b;
    private a;
    private l;
    readonly includedProperties: string[];
    readonly excludedProperties: string[];
    getCurrentDataSource(): IDataSourceLocalDataProvider;
    pushDataSource(a: IDataSourceLocalDataProvider): void;
    hasValidType(a: DataSeries): boolean;
    popDataSource(): any;
    getCurrentPathSegment(): string;
    getCurrentPath(): string;
    getParentTitle(): string;
    pushPath(a: string): void;
    popPath(): any;
    pushParentTitle(a: string): void;
    popParentTitle(): any;
    private ab;
    addDataSeries(a: DataSeries, b: IDataSeriesAdapterRule): void;
    removeDataSeries(a: DataSeries): void;
    insertDataSeries(a: number, b: DataSeries, c: IDataSeriesAdapterRule): void;
    clearDataSeries(): void;
    getDataSeriesCount(): number;
    getDataSeriesAt(a: number): DataSeries;
}
/**
 * @hidden
 */
export declare class DataSeriesDataProviderAnalyzer extends Base {
    static $t: Type;
    constructor(a: DataSeriesAdapterRunContext);
    p: DataSeriesAdapterRunContext;
    private b;
    private a;
    private s;
    private r;
    private ak;
    private am;
    private aj;
    private al;
    includedProperties: string[];
    excludedProperties: string[];
    getParentTitle(): string;
    shouldIncludeProperty(a: string, b: string): boolean;
    private u;
    private y;
    expandCamelCasedWords(a: string): string;
    hasStringProperties(): boolean;
    getAllStringProperties(): string[];
    isCollection(a: any): boolean;
    getAllPropertiesWithName(a: string): string[];
    getAllNumericProperties(): string[];
    getAllObjectProperties(): string[];
    getAllCollectionProperties(): string[];
    getFirstNumericProperty(): string;
    hasNumericProperties(): boolean;
    private ab;
    private q;
    private n;
    private ai;
    private t;
    getAllPropertiesWithIntent(a: string): string[];
    getAllPropertiesWithValuelessIntent(a: string): string[];
    getPropertyIntentValue(a: string, b: string): string;
    getAllPropertiesWithValuedIntent(a: string): string[];
    private i;
    getAllDateTimeProperties(): string[];
    getFirstDateTimeProperty(): string;
    getFirstStringProperty(): string;
    hasDateTimeProperties(): boolean;
    private ae;
    private af;
    isMonotonic(a: IDataSourceLocalDataProvider, b: string, c: number): boolean;
    private aw;
    getFirstDistinctStringProperty(a: number): string;
    getFirstDistinctNumericProperty(a: number): string;
    getFirstDistinctMonotonicNumericProperty(a: number): string;
    getFirstDistinctDateTimeProperty(a: number): string;
    getFirstStringPropertyPreferringDistinct(a: number): string;
    getTitleString(a: any, b: string[]): string;
    private aq;
    getNonNullPropertyValue(a: string): any;
    private ag;
    private aa;
    private an;
    private ad;
}
/**
 * @hidden
 */
export declare class DataSeriesAdapterUpdateNotifier extends Base implements IDataSourceDataProviderUpdateNotifier {
    static $t: Type;
    private a;
    private b;
    constructor(a: DataSeriesAdapterImplementation, b: IDataSourceLocalDataProvider);
    notifyClearItems(): void;
    notifyInsertItem(a: number, b: any): void;
    notifyRemoveItem(a: number, b: any): void;
    notifySetItem(a: number, b: any, c: any): void;
}
/**
 * @hidden
 */
export declare class DataSeriesAdapterRuleCollection extends ObservableCollection$1<IDataSeriesAdapterRule> {
    static $t: Type;
    constructor();
}
/**
 * @hidden
 */
export declare class DataSeriesAdapterRemovingDuplicatesEventArgs extends Base {
    static $t: Type;
    b: DataSeriesAdapterRunContext;
    d: string;
    e: string;
    a: DataSeries[];
    c: boolean;
}
/**
 * @hidden
 */
export declare class DataSeriesAdapterRunEventArgs extends Base {
    static $t: Type;
    a: DataSeriesAdapterRunContext;
    b: boolean;
}
/**
 * @hidden
 */
export declare class DataSeriesAdapterImplementation extends Base implements INotifyPropertyChanged {
    static $t: Type;
    constructor();
    q: (arg1: string) => string;
    v(a: string, b: string): string;
    private ai;
    private ap;
    r: any;
    readonly g: IExternalDataSeriesAdapter;
    private n;
    private o;
    propertyChanged: (sender: any, e: PropertyChangedEventArgs) => void;
    itemsSource: IEnumerable;
    private c;
    supportedSeriesTypes: DataSeriesType[];
    private b;
    includedProperties: string[];
    private a;
    excludedProperties: string[];
    private _rules;
    rules: DataSeriesAdapterRuleCollection;
    private _dataSeries;
    dataSeries: DataSeriesCollection;
    protected ad(a: string, b: any, c: any): void;
    protected aj(a: string, b: any, c: any): void;
    private m;
    refresh(): void;
    private y;
    private at;
    private ao;
    private as;
    removingUnsupported: (sender: any, args: DataSeriesAdapterRunEventArgs) => void;
    removingDuplicates: (sender: any, args: DataSeriesAdapterRemovingDuplicatesEventArgs) => void;
    private an;
    private ar;
    private aq;
    l(a: any): IDataSourceLocalDataProvider;
    al(a: DataSeriesAdapterRunContext, b: any, c: string, d: boolean): void;
    private x;
    private ak;
    ae(a: IDataSourceLocalDataProvider): void;
    af(a: IDataSourceLocalDataProvider, b: number, c: any): void;
    ag(a: IDataSourceLocalDataProvider, b: number, c: any): void;
    ah(a: IDataSourceLocalDataProvider, b: number, c: any, d: any): void;
    notifyClearItems(a: any): void;
    notifyInsertItem(a: any, b: number, c: any): void;
    notifyRemoveItem(a: any, b: number, c: any): void;
    notifySetItem(a: any, b: number, c: any, d: any): void;
}
