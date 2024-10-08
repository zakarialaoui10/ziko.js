export * from "./ziko-app";
export * from "./json-style-sheet";

import * as __App__ from "./ziko-app"
import * as __JSS__ from "./json-style-sheet"

export default {
    ...__App__,
    ...__JSS__
}