import { Matrix } from "./Matrix";
const luDecomposition=matrix=>{
    if(matrix instanceof Matrix)matrix=matrix.arr;
    const n = matrix.length;
    const L = new Array(n).fill(0).map(() => new Array(n).fill(0));
    const U = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        // Upper Triangular
        for (let k = i; k < n; k++) {
            // Summation of L(i, j) * U(j, k)
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += (L[i][j] * U[j][k]);
            }
            U[i][k] = matrix[i][k] - sum;
        }
        // Lower Triangular
        for (let k = i; k < n; k++) {
            if (i == k) {
                L[i][i] = 1; // Diagonal as 1
            } else {
                // Summation of L(k, j) * U(j, i)
                let sum = 0;
                for (let j = 0; j < i; j++) {
                    sum += (L[k][j] * U[j][i]);
                }
                // Evaluate L(k, i)
                L[k][i] = (matrix[k][i] - sum) / U[i][i];
            }
        }
    }
    return [L, U].map(n=>new Matrix(n));
}
const dotProduct=(v1, v2)=>v1.reduce((sum, el, i) => sum + el * v2[i], 0);
const magnitude=vector=>Math.sqrt(vector.reduce((sum, el) => sum + el * el, 0));
const normalize=vector=>vector.map(el => el / magnitude(vector));
const qrDecomposition=matrix=>{
    if(matrix instanceof Matrix)matrix=matrix.arr;
    const m = matrix.length;
    const n = matrix[0].length;
    const Q = [];
    const R = [];
    // Initialize R as an m x n matrix of zeroes
    for (let i = 0; i < m; i++) {
        R.push(new Array(n).fill(0));
    }
    for (let j = 0; j < n; j++) {
        let v = matrix.map(row => row[j]);
        for (let i = 0; i < j; i++) {
            const q = Q[i];
            const r_ij = dotProduct(q, matrix.map(row => row[j]));
            for (let k = 0; k < m; k++) {
                v[k] -= r_ij * q[k];
            }
            R[i][j] = r_ij;
        }
        const v_mag = magnitude(v);
        Q.push(normalize(v));
        R[j][j] = v_mag;
    }
    return [Q, R].map(n=>new Matrix(n));
}
export { 
    luDecomposition,
    qrDecomposition
 }
