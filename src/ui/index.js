export * from "./elements/text";
export * from "./elements/list";
export * from "./elements/io";
export * from "./elements/media";
export * from "./elements/table";
export * from "./elements/semantic";
export * from "./elements/misc";
export * from "./elements/flex"
export * from "./elements/grid"

import * as Text from "./elements/text";
import * as List from "./elements/list";
import * as Io from "./elements/io";
import * as Media from "./elements/media";
import * as Table from "./elements/table";
import * as Semantic from "./elements/semantic";
import * as Misc from "./elements/misc";
import * as Flex from "./elements/flex";
import * as Grid from "./elements/grid";

console.log({Grid})

import ZikoUIElement from "./elements/ZikoUIElement";

export{
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
    ZikoUIElement,
}
export default UI;