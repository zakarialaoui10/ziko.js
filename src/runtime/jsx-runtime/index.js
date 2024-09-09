function jsx(tag, props, ...children) {
    return {
      tag,
      props: props || {},
      children: children.length ? children.flat() : []
    };
}
const jsxs = jsx
export{
    jsx,
    jsxs
}