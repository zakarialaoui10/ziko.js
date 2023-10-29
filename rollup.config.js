
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
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
    name:"Ziko"
  }
],
  plugins: [resolve(), commonjs()],
};
