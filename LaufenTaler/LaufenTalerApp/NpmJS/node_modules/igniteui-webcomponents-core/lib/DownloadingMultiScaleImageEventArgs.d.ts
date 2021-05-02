import { EventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class DownloadingMultiScaleImageEventArgs extends EventArgs {
    static $t: Type;
    private _uri;
    uri: string;
    private _image;
    image: HTMLImageElement;
}
