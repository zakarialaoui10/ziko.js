export * from "./elements/text";
export * from "./elements/list";
export * from "./elements/io";
export * from "./elements/media";
export * from "./elements/table";
export * from "./elements/semantic";
export * from "./elements/misc";
// export * from "./elements/derived";

import * as Text from "./elements/text";
import * as List from "./elements/list";
import * as Io from "./elements/io";
import * as Media from "./elements/media";
import * as Table from "./elements/table";
import * as Semantic from "./elements/semantic";
import * as Misc from "./elements/misc";
// import * as Derived from "./elements/derived";

import ZikoUIElement from "./elements/ZikoUIElement";
import ZikoUIContainerElement from "./elements/ZikoUIContainerElement";

export{
    ZikoUIContainerElement,
    ZikoUIElement
}
const UI = {
    ...Text,
    ...List,
    ...Io,
    ...Media,
    ...Table,
    ...Semantic,
    ...Misc,
    // ...Derived,
    ZikoUIElement,
    ZikoUIContainerElement
}
export default UI;