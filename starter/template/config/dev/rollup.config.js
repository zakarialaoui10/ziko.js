
//import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

let isBrowserOpened=false;
const banner= `
/*
  Project: ziko.js starter App
  Date : ${new Date()}
*/
`
export default {
  input: 'src/main.js',
  output: [
  {
    file: 'public/dist/ziko-app.js',
    format: 'iife',
    banner,
  },
],
  plugins: [
    resolve(), 
    //commonjs(),
    serve({
      open: !isBrowserOpened,
      onListening: function(server) {
        isBrowserOpened = true; 
      }
    }),
    livereload({
      watch:"src"
    })
  ],
};
