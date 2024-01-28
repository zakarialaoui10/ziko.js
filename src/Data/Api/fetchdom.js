import { preload } from "./preload"

async function fetchdom(url='https://github.com/zakarialaoui10'){
  const data=await fetch(url)
  const html=await data.text()
  const dom= new DOMParser().parseFromString(html,'text/xml')
  return dom.documentElement
}
function fetchdomSync(url='https://github.com/zakarialaoui10'){
  const data=preload(url);
  const dom= new DOMParser().parseFromString(data,'text/xml')
  return dom.documentElement;
}
export {fetchdom,fetchdomSync}