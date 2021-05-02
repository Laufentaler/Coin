import { SelectedItemChangedEventArgsDescription } from "./SelectedItemChangedEventArgsDescription";
import { Type } from "./type";
/**
 * @hidden
 */
export declare class SelectedItemChangingEventArgsDescription extends SelectedItemChangedEventArgsDescription {
    static $t: Type;
    protected get_type(): string;
    constructor();
    private k;
    cancel: boolean;
}
