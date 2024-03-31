import React, { useRef, useEffect } from "react";
import {ZikoUIElement} from "ziko";
/**
 * A React component for rendering ZikoUIElement.
 * @param {Object} props - Component props.
 * @param {ZikoUIElement} props.ui - The ZikoUIElement to render.
 * @returns {JSX.Element} JSX representation of the ZikoUI component.
 */
function ZikoUI({ ui }) {
  const containerRef = useRef(null);
  useEffect(() => {
    globalThis.__ZikoConfig__.setDefault({render:false})
    if (containerRef.current && ui && ui instanceof ZikoUIElement) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(ui.element);
    }
  }, [ui]);
  return (
      <ziko-ui ref={containerRef} data-engine="ziko"></ziko-ui>
  );
}
export default ZikoUI;
