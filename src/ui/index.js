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
} from "./elements/text";
import {
    btn,
    br,
    hr,
    brs,
    hrs,
    link,
    html
} from "./elements/misc";
import {
    ol,
    ul
} from "./elements/list"
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
} from "./elements/io";
import {
    image,
    video,
    audio,
    figure
} from "./elements/media"
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
    Splitter,
    hSlider,
    vSlider,
    Slider,
    Breadcrumbs,
    successAlert,
    infoAlert,
    warningAlert,
    dangerAlert,
} from "./elements"
import{
    Header,
    Main,
    Section,
    Article,
    Aside,
    Nav,
    Footer,
    } from "./elements/semantic";
import { Table } from "./elements/table";
import { 
    PDFViewer,
    HTMLViewer
 } from "./elements/embaded";
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
    Splitter,
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
// export * from "./elements/text";
// export * from "./elements/list";
// export * from "./elements/io";
// export * from "./elements/media";
// export * from "./elements/table";
// export * from "./elements/semantic";
// export * from "./elements/misc";
// export * from "./elements/derived";
export * from "./elements"
export {
    html,
}
export default UI;