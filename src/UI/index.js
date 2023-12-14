import { Themes } from "./Theme/index.js";
import {
    text,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6
} from "./Text/index.js";
import {
    br,
    hr,
    brs,
    hrs,
    link,
    ZikoHtml
} from "./Misc/index.js";
import {
    ol,
    ul
} from "./List/index.js"
import {
    btn,
    input,
    search,
    slider,
    checkbox,
    radio,
    datalist,
    inputNumber,
    inputColor,
    inputDate,
    inputDateTime,
    inputEmail,
    inputImage,
    inputPassword,
    inputTime,
    select,
    textarea,
    inputCamera
} from "./Inputs/index.js";
import {
    image,
    video,
    audio,
    figure
} from "./Media/index.js"
import{
    Flex,
    Grid,
    Carousel,
    CodeNote,
    Tabs,
} from "./CustomElement/index.js"
import{
    Header,
    FlexHeader,
    Main,
    FlexMain,
    Section,
    FlexSection,
    Article,
    FlexArticle,
    Aside,
    FlexAside,
    Nav,
    FlexNav,
    Footer,
    FlexFooter,
    } from "./Semantic/index.js";
import { Table } from "./Table/index.js";
const UI={
    Themes,
    ZikoHtml,
    text,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    btn,
    br,
    hr,
    brs,
    hrs,
    link,
    ol,
    ul,
    input,
    search,
    slider,
    checkbox,
    radio,
    datalist,
    inputNumber,
    inputColor,
    inputDate,
    inputDateTime,
    inputEmail,
    inputImage,
    inputPassword,
    inputTime,
    select,
    textarea,
    inputCamera,
    image,
    video,
    audio,
    figure,
    Flex,
    Carousel,
    Grid,
    Header,
    FlexHeader,
    Main,
    FlexMain,
    Section,
    FlexSection,
    Article,
    FlexArticle,
    Aside,
    FlexAside,
    Nav,
    FlexNav,
    Footer,
    FlexFooter,
    Table,
    CodeNote,
    Tabs,
    ExtractAll:function(){
        for (let i = 0; i < Object.keys(this).length; i++) {
            globalThis[Object.keys(this)[i]] = Object.values(this)[i];
        }
        return this;
    },
    RemoveAll:function(){
        for (let i = 0; i < Object.keys(this).length; i++) delete globalThis[Object.keys(this)[i]];   
        return this;
    }
}
export * from "./Media"
export {
    ZikoHtml}
export default UI;