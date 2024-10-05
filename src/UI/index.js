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
} from "./elements/primitives/text/index.js";
import {
    btn,
    br,
    hr,
    brs,
    hrs,
    link,
    html
} from "./elements/primitives/misc/index.js";
import {
    ol,
    ul
} from "./elements/primitives/list/index.js"
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
} from "./elements/primitives/io/index.js";
import {
    image,
    video,
    audio,
    figure
} from "./elements/primitives/media/index.js"
import{
    Flex,
    Grid,
    Carousel,
    CodeCell,
    CodeNote,
    Tabs,
    Collapsible,
    Accordion,
    Modal,
    hSplitter,
    vSplitter,
    hSlider,
    vSlider,
    Slider,
    Breadcrumbs,
    successAlert,
    infoAlert,
    warningAlert,
    dangerAlert,
} from "./elements/derived/index.js"
import{
    Header,
    Main,
    Section,
    Article,
    Aside,
    Nav,
    Footer,
    } from "./elements/primitives/semantic/index.js";
import { Table } from "./elements/primitives/table/index.js";
import { 
    PDFViewer,
    HTMLViewer
 } from "./elements/primitives/embaded/index.js";
import { jsonStyleSheet } from "./style/jsonStyleSheet.js"
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
    Modal,
    hSplitter,
    vSplitter,
    hSlider,
    vSlider,
    Slider,
    Breadcrumbs,
    successAlert,
    infoAlert,
    warningAlert,
    dangerAlert,
    PDFViewer,
    HTMLViewer,
    jsonStyleSheet,
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
export * from "./elements/primitives/text/index.js";
export * from "./elements/primitives/list/index.js";
export * from "./elements/primitives/io/index.js";
export * from "./elements/primitives/media/index.js";
export * from "./elements/primitives/table/index.js";
export * from "./elements/primitives/semantic/index.js";
export * from "./elements/primitives/misc/index.js";
export * from "./elements/derived/index.js";
export {
    html,
}
export default UI;