export * from "./loop.js"
export * from "./animation.js"
export * from "./utils";
import * as Loop from "./loop.js";
import * as Animation from "./loop.js";
import * as Utils from "./utils"
const Time = {
    ...Loop,
    ...Animation,
    ...Utils
}
export default Time