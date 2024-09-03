import ZikoUIElement from "../../ZikoUIElement";
import { ZikoUIFlex } from "../../CustomElement/Flex";
class ZikoUIForm extends ZikoUIFlex{
    constructor(...items){
        super("form", "Form");
        this.append(...items);
    }
    get data(){
        let formData = new FormData(this.element);
        this.items.forEach(n=>formData.append(n.element.name, n.value))
        return formData;
    }
    getByName(name){
        return this.data.get(name);
    }
}
const Form = (...items) => new ZikoUIForm(...items);
window.Form = Form;
export{
    Form,
    ZikoUIForm
}