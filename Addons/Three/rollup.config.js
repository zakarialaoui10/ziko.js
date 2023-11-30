
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/ziko-three.cjs',
    format: 'cjs',
    globals: {
      ziko: 'Ziko'
    }
  },{
    file: 'dist/ziko-three.mjs',
    format: 'es',
    globals: {
      ziko: 'Ziko'
    }
  },
  {
    file: 'dist/ziko-three.js',
    format: 'umd',
    name:"ZikoThree",
    globals: {
      ziko: 'Ziko'
    }
  }
],
  external: ["ziko"],
  plugins: [resolve(), commonjs(),terser()],
};
