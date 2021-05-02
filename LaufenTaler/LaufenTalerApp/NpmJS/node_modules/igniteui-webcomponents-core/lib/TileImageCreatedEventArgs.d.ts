import { EventArgs, Type } from "./type";
/**
 * @hidden
 */
export declare class TileImageCreatedEventArgs extends EventArgs {
    static $t: Type;
    private _imageData;
    imageData: number[];
    private _image;
    image: any;
    private _z;
    z: number;
    private _x;
    x: number;
    private _y;
    y: number;
    private _url;
    url: string;
}
