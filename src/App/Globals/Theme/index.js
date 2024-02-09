import LightThemes from "./light";
import DarkThemes from "./dark";
import { Random } from "../../../Math/Random";
const AllThemes={
    ...LightThemes,
    ...DarkThemes
}
class ZikoGlobalsTheme{
  constructor(theme){
    this.id="Ziko-Theme-"+Random.string(10);
    this.use(theme)
  }
  get currentTheme(){
    const colorNames = [
      'background',
      'currentLine',
      'selection',
      'foreground',
      'comment',
      'cyan',
      'green',
      'orange',
      'pink',
      'purple',
      'red',
      'yellow',
  ];
  return colorNames.reduce((theme, color) => {
      theme[color] = `var(--${color}-${this.id})`;
      return theme;
  }, {});

}
  useThemeIndex(index){
    const keys=Object.keys(AllThemes);
        for(let a in AllThemes[keys[index]]){
            document.documentElement.style.setProperty(`--${a}-${this.id}`, AllThemes[keys[index]][a]);
        }
        return this;
  }
  useThemeName(str){
    str=str.toLowerCase()
    const AllThemes_With_Lower_Case=Object.fromEntries(Object.entries(AllThemes).map(n=>[n[0].toLowerCase(),n[1]]))
        for(let a in AllThemes_With_Lower_Case[str]){
            document.documentElement.style.setProperty(`--${a}-${this.id}`, AllThemes_With_Lower_Case[str][a]);
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
const Theme=(theme=0)=>new ZikoGlobalsTheme(theme)
export {
    Theme,
    AllThemes,
    LightThemes,
    DarkThemes,
};