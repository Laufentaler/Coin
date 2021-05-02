import { Base, Type } from "./type";
import { DataTemplateRenderInfo } from "./DataTemplateRenderInfo";
import { DataTemplateMeasureInfo } from "./DataTemplateMeasureInfo";
import { DataTemplatePassInfo } from "./DataTemplatePassInfo";
/**
 * @hidden
 */
export declare class DataTemplate extends Base {
    static $t: Type;
    private _render;
    render: (info: DataTemplateRenderInfo) => void;
    private _measure;
    measure: (info: DataTemplateMeasureInfo) => void;
    private _passStarting;
    passStarting: (info: DataTemplatePassInfo) => void;
    private _passCompleted;
    passCompleted: (info: DataTemplatePassInfo) => void;
}
