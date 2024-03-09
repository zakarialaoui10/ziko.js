
//import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve'


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
    file: 'build/index.js',
    format: 'umd',
    name:"ZikoDist",
    banner,
  },
],
  plugins: [
    resolve(), 
    //commonjs(),
    serve(),
    livereload()
  ],
};
