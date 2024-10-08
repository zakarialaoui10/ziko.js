import { powerSet , subSet } from "./Set/index.js";
import { Base } from "./Conversion/index.js";
import { Logic } from "./Logic/index.js";
import {
    Permutation,
} from "./Permutation/index.js"
import {
    Combinaison,
    combinaison,
} from "./Combinaison/index.js"


const Discret={
    Logic,
    Base,
    Permutation,
    Combinaison,
    combinaison,
    powerSet,
    subSet
}
export default Discret;
export{Logic,Base,Permutation,Combinaison,powerSet,subSet}