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
} from "./text/index.js";
import {
    btn,
    br,
    hr,
    brs,
    hrs,
    link,
    html
} from "./misc/index.js";
import {
    ol,
    ul
} from "./list/index.js"
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
} from "./io/index.js";
import {
    image,
    video,
    audio,
    figure
} from "./media/index.js"
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
    } from "./semantic/index.js";
import { Table } from "./table/index.js";
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
export * from "./text/index.js";
export * from "./list/index.js";
export * from "./io/index.js";
export * from "./media/index.js";
export * from "./table/index.js";
export * from "./semantic/index.js";
export * from "./misc/index.js";
export * from "./custom-elements/index.js";
export {
    html,
}
export default UI;