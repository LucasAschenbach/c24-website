import * as math from 'mathjs';

function multiplyMatrices(...matrices: math.Matrix[]): math.Matrix {
  return matrices.reduce((acc, matrix) => math.multiply(acc, matrix) as math.Matrix);
}

export function ellipticDistance<T>(x: math.Matrix, axis1: number, axis2: number, rot: number): T {
  // Skew along x and y axes
  const D = math.matrix([
    [1 / axis1, 0],
    [0, 1 / axis2]
  ]);
  // Rotation matrix
  const M = math.matrix([
    [Math.cos(rot), -Math.sin(rot)],
    [Math.sin(rot), Math.cos(rot)]
  ]);
  // Inverse rotation matrix
  const N = math.matrix([
    [Math.cos(rot), Math.sin(rot)],
    [-Math.sin(rot), Math.cos(rot)]
  ]);
  const A = multiplyMatrices(M, D, N);
  return math.abs(multiplyMatrices(math.transpose(x), A, x)) as T;
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}
