import ZikoUIElement from "../ZikoUIElement.js";
function h(tag, attributes, ...children){
    const {name, style, ...attrs} = attributes
    let element = new ZikoUIElement(tag,name);
    style && element.style(style);
    attrs && element.setAttr(attrs)
    return element
}

export {h}