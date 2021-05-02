import { EventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class CancellingMultiScaleImageEventArgs extends EventArgs {
    static $t: Type;
    private _uri;
    uri: string;
    private _image;
    image: HTMLImageElement;
}
