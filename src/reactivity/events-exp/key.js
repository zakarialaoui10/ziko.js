import { __ZikoEvent__ } from "./__ZikoEvent__.js";
import { Events } from "./__Events__.js";
class ZikoEventKey extends __ZikoEvent__{
    constructor(target){
        super(target, Events.Key, details_setter)
    }
}
function details_setter(){

}
const __useKeyEvent=target=>new ZikoEventKey(target)

export{
    __useKeyEvent,
    ZikoEventKey
}