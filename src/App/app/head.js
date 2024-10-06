import { 
    useTitle,
    // useMeta,
    // useLink,
    // useStyleSheet,
} from "../../reactivity";
class ZikoHead{
    constructor(){
        // this.document = globalThis?.document;
        // this.head = this.document?.head;
        // this.title = this.document?.title;
    }
}

const Head = () => new ZikoHead
a= Head()