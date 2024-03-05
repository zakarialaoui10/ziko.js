
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const banner= `
/*
  Project: ziko.js starter App
  Date : ${new Date()}
*/
`
export default {
  input: 'main.js',
  output: [
  {
    file: 'public/build/index.js',
    format: 'umd',
    name:"ZikoDist",
    banner,
  },
],
  plugins: [
    resolve(), 
    commonjs(),
  ],
};
