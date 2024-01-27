import { Themes } from "../App/Apparence/Theme/index.js";
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
    Accordion,
} from "./CustomElement/index.js"
import{
    Header,
    Main,
    Section,
    Article,
    Aside,
    Nav,
    Footer,
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
    Main,
    Section,
    Article,
    Aside,
    Nav,
    Footer,
    Table,
    CodeNote,
    Tabs,
    Accordion,
    ExtractAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'ExtractAll' && key !== 'RemoveAll') {
                globalThis[key] = this[key];
            }
        }
        return this;
    },
    RemoveAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'RemoveAll') {
                delete globalThis[key];
            }
        }
        return this;
    }
}
export * from "./Text";
export * from "./List";
export * from "./Inputs";
export * from "./Media";
export * from "./Table";
export * from "./Semantic";
export * from "./Misc";
export * from "./CustomElement";
export {
    ZikoHtml
}
export default UI;