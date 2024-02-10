class ZikoUseStyle{
    constructor(style,id=0){
      this.id="Ziko-Style-"+id;
      this.use(style);
      this.keys=new Set();
      this.styles={
        default:{
          fontSize:"1em"
        }
      }
    }
    get current(){
      return [...this.keys].reduce((key, value) => {
        key[value] = `var(--${value}-${this.id})`;
        return key;
      }, {});
    }
    add(name,style={}){
      if(name instanceof Object)Object.assign(this.styles,name)
      else Object.assign(this.styles,{[name]:style});
      return this;
    }
    #useStyleIndex(index){
      const keys=Object.keys(this.styles);
        for(let a in this.styles[keys[index]]){
          document.documentElement.style.setProperty(`--${a}-${this.id}`, this.styles[keys[index]][a]);
          this.keys.add(a);
        }

        return this;
    }
    #useStyleName(name){
      for(let a in this.styles[name]){
        document.documentElement.style.setProperty(`--${a}-${this.id}`, this.styles[name][a]);
        this.keys.add(a);
      }
      return this;
    }
    #useStyleObject(Style){
      for(let a in Style){
        document.documentElement.style.setProperty(`--${a}-${this.id}`, Style[a]);
        this.keys.add(a);
      }
      return this;
    }
    use(style){
      if(typeof style === "number")this.#useStyleIndex(style);
      if(typeof style === "string")this.#useStyleName(style);
      if(style instanceof Object)this.#useStyleObject(style);
      return this;
    }
  }  
const useStyle=id=>style=>new ZikoUseStyle(style,id)
export {useStyle}