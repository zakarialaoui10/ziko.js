
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const banner= `
/*
  Author: Zakaria Elalaoui
  Date: ${new Date().toLocaleDateString()}
  Project: zikojs
*/
`
export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/ziko.cjs',
    format: 'cjs',
    banner,
  },{
    file: 'dist/ziko.mjs',
    format: 'es',
    banner,
  },
  {
    file: 'dist/ziko.js',
    format: 'umd',
    name:"Ziko",
    banner,
  },
  {
    file: 'dist/ziko.min.js',
    format: 'umd',
    name:"Ziko",
    banner,
    plugins:[terser()]
  },
  
],
  plugins: [resolve(), commonjs() ],
};
