import { Base, IEnumerable$1, IList$1, Point, Type } from "./type";
import { TriangulationSourcePointRecord } from "./TriangulationSourcePointRecord";
import { Triangle } from "./Triangle";
import { BinaryReader } from "./BinaryReader";
/**
 * @hidden
 */
export declare class TriangulationSource extends Base {
    static $t: Type;
    static create(a: number, b: (arg1: number) => Point, c: (arg1: number) => number): TriangulationSource;
    static loadItf(a: BinaryReader): TriangulationSource;
    private _points;
    points: IEnumerable$1<TriangulationSourcePointRecord>;
    private _triangles;
    triangles: IList$1<Triangle>;
}
