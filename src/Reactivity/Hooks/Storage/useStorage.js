// To do : remove old items
import { useChannel } from "../Interactions";
class ZikoUseStorage{
    #CACHE
    constructor(storage,globalKey,initialValue){
        this.#CACHE={
            storage,
            globalKey,
            channel:useChannel(`Ziko:useStorage-${globalKey}`),
            oldItemKeys:new Set()
        }
        this.#init(initialValue);
        this.#maintain();
    }
    get items(){
        return JSON.parse(this.#CACHE.storage[this.#CACHE.globalKey]??null);
    }
    #maintain() {
        for(let i in this.items)Object.assign(this, { [[i]]: this.items[i] });
    }
    #init(initialValue){
        this.#CACHE.channel=useChannel(`Ziko:useStorage-${this.#CACHE.globalKey}`);
        this.#CACHE.channel.on("Ziko-Storage-Updated",()=>this.#maintain());
        if(!initialValue)return;
        if(this.#CACHE.storage[this.#CACHE.globalKey]){
            Object.keys(this.items).forEach(key=>this.#CACHE.oldItemKeys.add(key));
            console.group("Ziko:useStorage")
            console.warn(`Storage key '${this.#CACHE.globalKey}' already exists. we will not overwrite it.`);
            console.info(`%cWe'll keep the existing data.`,"background-color:#2222dd; color:gold;");
            console.group("")
        }
        else this.set(initialValue);
    }
    set(data){
        this.#CACHE.storage.setItem(this.#CACHE.globalKey,JSON.stringify(data));
        this.#CACHE.channel.emit("Ziko-Storage-Updated",{});
        Object.keys(data).forEach(key=>this.#CACHE.oldItemKeys.add(key));
        this.#maintain();
        return this
    }
    add(data){
        const db={
            ...this.items,
            ...data
        }
        this.#CACHE.storage.setItem(this.#CACHE.globalKey,JSON.stringify(db));
        this.#maintain();
        return this;
    }
    remove(...keys){
        const db={...this.items};
        for(let i=0;i<keys.length;i++){
            delete db[keys[i]];
            delete this[keys[i]];
        }
        this.set(db);
        return this;
    }
    get(key){
        return this.items[key];
    }
    clear(){
        this.#CACHE.storage.removeItem(this.#CACHE.globalKey);
        this.#maintain();
        return this;
    }

}
const useLocaleStorage=(key,initialValue)=>new ZikoUseStorage(localStorage,key,initialValue);
const useSessionStorage=(key,initialValue)=>new ZikoUseStorage(sessionStorage,key,initialValue);
export{
    useLocaleStorage,
    useSessionStorage
}