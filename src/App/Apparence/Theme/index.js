import LightThemes from "./light";
import DarkThemes from "./dark";
const Themes={
    ...LightThemes,
    ...DarkThemes
}
class ZikouseTheme{
  constructor(theme){
    this.id="Ziko-Theme-"+crypto.randomUUID().slice(0,8);
    this.use(theme)
  }
  get Theme(){
    return{
        background: `var(--background-${this.id})`,
        currentLine: `var(--currentLine-${this.id})`,
        selection: `var(--selection-${this.id})`,
        foreground: `var(--foreground-${this.id})`,
        comment: `var(--comment-${this.id})`,
        cyan: `var(--cyan-${this.id})`,
        green: `var(--green-${this.id})`,
        orange: `var(--orange-${this.id})`,
        pink: `var(--pink-${this.id})`,
        purple: `var(--purple-${this.id})`,
        red: `var(--red-${this.id})`,
        yellow: `var(--yellow-${this.id})`,
    }
}
  useThemeIndex(index){
    const keys=Object.keys(Themes);
        for(let a in Themes[keys[index]]){
            document.documentElement.style.setProperty(`--${a}-${this.id}`, Themes[keys[index]][a]);
        }
        return this;
  }
  useThemeName(str){
    str=str.toLowerCase()
    const Themes_With_Lower_Case=Object.fromEntries(Object.entries(Themes).map(n=>[n[0].toLowerCase(),n[1]]))
        for(let a in Themes_With_Lower_Case[str]){
            document.documentElement.style.setProperty(`--${a}-${this.id}`, Themes_With_Lower_Case[str][a]);
        }
        return this;
  }
  useThemeObject(Theme){
    for(let a in Theme){
      document.documentElement.style.setProperty(`--${a}-${this.id}`, Theme[a]);
    }
    return this;
  }
  use(theme){
    if(typeof theme === "number")this.useThemeIndex(theme);
    if(typeof theme === "string")this.useThemeName(theme);
    if(theme instanceof Object)this.useThemeObject(theme);
    return this;
  }
}  
const useTheme=(theme=0)=>new ZikouseTheme(theme)
export {
    useTheme,
    Themes,
    LightThemes,
    DarkThemes,
};