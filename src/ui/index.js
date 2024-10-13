export * from "./elements/primitives/text";
export * from "./elements/primitives/list";
export * from "./elements/primitives/io";
export * from "./elements/primitives/media";
export * from "./elements/primitives/table";
export * from "./elements/primitives/semantic";
export * from "./elements/primitives/misc";
export * from "./elements/derived";

import * as Text from "./elements/primitives/text";
import * as List from "./elements/primitives/list";
import * as Io from "./elements/primitives/io";
import * as Media from "./elements/primitives/media";
import * as Table from "./elements/primitives/table";
import * as Semantic from "./elements/primitives/semantic";
import * as Misc from "./elements/primitives/misc";
import * as Derived from "./elements/derived";

import ZikoUIElement from "./elements/primitives/ZikoUIElement";
import ZikoUIContainerElement from "./elements/primitives/ZikoUIContainerElement";

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
    ...Derived,
    ZikoUIElement,
    ZikoUIContainerElement
}
export default UI;