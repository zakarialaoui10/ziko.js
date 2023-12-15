import LightThemes from "./light";
import DarkThemes from "./dark";
const Themes={
    ...LightThemes,
    ...DarkThemes
}

const keys=Object.keys(Themes);
const useThemeByName=(app,name)=>{for (a in Themes[name]) app.root.style.setProperty(`--${a}-${app.id}`, Themes[name][a])};
const useThemeByIndex=(app,index)=>{for (a in Themes[keys[index]]) app.root.style.setProperty(`--${a}-${app.id}`, Themes[keys[index]][a])};
  export {
    Themes,
    useThemeByName,
    useThemeByIndex
};