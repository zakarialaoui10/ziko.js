
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const banner= `
/*
  Project: ziko.js
  Author: Zakaria Elalaoui
  Date : ${new Date()}
  Git-Repo : https://github.com/zakarialaoui10/ziko.js
  Git-Wiki : https://github.com/zakarialaoui10/ziko.js/wiki
  Released under MIT License
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
    plugins:[terser({
      output: {
        comments: (node, { type, value }) => type === 'comment2' && value.includes('Author'),
      },
    })]
  },
  
],
  plugins: [
    resolve(), 
    commonjs(),
    // babel({
    //   babelHelpers: 'bundled', // or 'runtime'
    //   //exclude: 'node_modules/**',
    // }), 
  ],
};
