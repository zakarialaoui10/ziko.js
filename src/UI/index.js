import {
    text,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6
} from "./Text";
import {
    br,
    hr,
    brs,
    hrs,
    link,
    ZikoHtml
} from "./Misc";
import {
    ol,
    ul
} from "./List"
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
} from "./Inputs";
import {
    image,
    video,
    audio,
    figure
} from "./Media"
import{
    Flex,
    Grid,
    Carousel,
    CodeCell,
    Tabs,
    Accordion,
} from "./CustomElement"
import{
    Header,
    Main,
    Section,
    Article,
    Aside,
    Nav,
    Footer,
    } from "./Semantic";
import { Table } from "./Table";
const UI={
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
    CodeCell,
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