import { SPA } from "./spa";
import { Section } from "../ui";
// import.meta.glob('./src/pages/**/*.js')
async function FileBasedRouting(pages /* use import.meta.glob */){
   const routes = Object.keys(pages)
   const pairs = {}
   for(let i=0; i<routes.length; i++){
      const module = await pages[routes[i]]()
      const component = await module.default
      Object.assign(pairs,{[customPath(routes[i])]:component})
   }
   return SPA({
      target : document.body,
      routes : {
         "/" : ()=>{},
         ...pairs
      },
      wrapper : Section()
   })   
}
function customPath(inputPath, root = './src/pages', extensions = ['js', 'ts']) {
   const normalizedPath = inputPath.replace(/\\/g, '/').replace(/\[(\w+)\]/g, '$1/:$1');
   const parts = normalizedPath.split('/');
   const rootParts = root.split('/');
   const rootIndex = parts.indexOf(rootParts[rootParts.length - 1]);
   if (rootIndex !== -1) {
       const subsequentParts = parts.slice(rootIndex + 1);
       const lastPart = subsequentParts[subsequentParts.length - 1];
       const isIndexFile = lastPart === 'index.js' || lastPart === 'index.ts';
       const hasValidExtension = extensions.some(ext => lastPart === `.${ext}` || lastPart.endsWith(`.${ext}`));
       if (isIndexFile) {
           return '/' + (subsequentParts.length > 1 ? subsequentParts.slice(0, -1).join('/') : '');
       }
       if (hasValidExtension) {
           return '/' + subsequentParts.join('/').replace(/\.(js|ts)$/, '');
       }
   }
   return '';
}
export{
    FileBasedRouting
}