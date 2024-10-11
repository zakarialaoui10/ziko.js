export * from "./ziko-app";
export * from "./json-style-sheet";
export * from "./spa"
export * from "./params"
export * from "./globals"
export * from "./spa-file-based-routing"

import * as __App__ from "./ziko-app"
import * as JsonStyleSheet from "./json-style-sheet"
import * as Spa from "./spa"
import * as Global from "./globals"
import * as Params from "./params"

const App={
    ...__App__,
    ...JsonStyleSheet,
    ...Spa,
    ...Global,
    ...Params
}
export default App