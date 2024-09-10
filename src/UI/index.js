import {
    text,
    quote,
    dfnText,
    supText,
    subText,
    codeText,
    abbrText,
    p,
    blockQuote,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,   
} from "./Text/index.js";
import {
    btn,
    br,
    hr,
    brs,
    hrs,
    link,
    html
} from "./Misc/index.js";
import {
    ol,
    ul
} from "./List/index.js"
import{
    Form,
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
} from "./Io/index.js";
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
    CodeCell,
    CodeNote,
    Tabs,
    Collapsible,
    Accordion,
    hSplitter,
    vSplitter,
    Breadcrumbs,
    successAlert,
    infoAlert,
    warningAlert,
    dangerAlert,
} from "./custom-elements/index.js"
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
    html,
    text,
    quote,
    dfnText,
    supText,
    subText,
    codeText,
    abbrText,
    p,
    blockQuote,
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
    Form,
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
    CodeNote,
    Tabs,
    Collapsible,
    Accordion,
    hSplitter,
    vSplitter,
    Breadcrumbs,
    successAlert,
    infoAlert,
    warningAlert,
    dangerAlert,
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
export * from "./Text/index.js";
export * from "./List/index.js";
export * from "./Io/index.js";
export * from "./Media/index.js";
export * from "./Table/index.js";
export * from "./Semantic/index.js";
export * from "./Misc/index.js";
export * from "./custom-elements/index.js";
export {
    html,
}
export default UI;