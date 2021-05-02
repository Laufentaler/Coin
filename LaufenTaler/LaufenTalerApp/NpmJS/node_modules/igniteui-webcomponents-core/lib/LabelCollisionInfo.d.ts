import { Base, Type } from "./type";
import { LinkedListNode$1 } from "./LinkedListNode$1";
import { QuadTreeBoundingBox } from "./QuadTreeBoundingBox";
import { LabelCollisionPlacementPositions } from "./LabelCollisionPlacementPositions";
import { List$1 } from "./List$1";
/**
 * @hidden
 */
export declare class LabelCollisionInfo extends Base {
    static $t: Type;
    e: LinkedListNode$1<LabelCollisionInfo>;
    o: number;
    p: number;
    n: number;
    m: number;
    c: QuadTreeBoundingBox;
    l: number;
    k: number;
    i: number;
    j: number;
    s: number;
    t: number;
    g: number;
    h: number;
    q: number;
    r: number;
    a: LabelCollisionPlacementPositions;
    b: QuadTreeBoundingBox;
    u: any;
    d: boolean;
    f: List$1<LabelCollisionInfo>;
}
