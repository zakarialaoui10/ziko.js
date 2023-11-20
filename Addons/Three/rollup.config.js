
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/ziko-three.cjs',
    format: 'cjs',
  },{
    file: 'dist/ziko-three.mjs',
    format: 'es',
  },
  {
    file: 'dist/ziko-three.js',
    format: 'umd',
    name:"ZikoThree"
  }
],
  plugins: [resolve(), commonjs()],
};
