import { Matrix } from "./Matrix";
class LinearSystem {
    static resolve(A, B) {
        return A.inv
            .dot(Matrix.fromVector(B))
            .arr.flat(1)
            .map((n) => +n.toFixed(10));
    }
}
export { LinearSystem }