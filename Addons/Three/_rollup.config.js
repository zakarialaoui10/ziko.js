
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/ziko-three.cjs',
    format: 'cjs',
    globals: {
      ziko: 'Ziko',
      three: 'THREE'
    }
  },{
    file: 'dist/ziko-three.mjs',
    format: 'es',
    globals: {
      ziko: 'Ziko',
      three: 'THREE'
    }
  },
  {
    file: 'dist/ziko-three.js',
    format: 'umd',
    name:"ZikoThree",
    globals: {
      ziko: 'Ziko',
      three: 'THREE'
    }
  }
],
  external: ["ziko","three"],
  plugins: [resolve(), commonjs()],
};
