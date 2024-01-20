
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/ziko.cjs',
    format: 'cjs',
  },{
    file: 'dist/ziko.mjs',
    format: 'es',
  },
  {
    file: 'dist/ziko.js',
    format: 'umd',
    name:"Ziko",
  },
  {
    file: 'dist/ziko.min.js',
    format: 'umd',
    name:"Ziko",
    plugins:[terser()]
  }
],
  plugins: [resolve(), commonjs() ],
};
