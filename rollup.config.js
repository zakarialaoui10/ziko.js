
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/index.cjs',
    format: 'cjs',
  },{
    file: 'dist/index.mjs',
    format: 'es',
  },
  {
    file: 'dist/index.js',
    format: 'umd',
    name:"Ziko"
  }
],
  plugins: [resolve(), commonjs()],
};
