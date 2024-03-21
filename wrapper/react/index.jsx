
/*
  Project: react-ziko
  Author: Zakaria Elalaoui
  Date : Wed Mar 20 2024 16:56:39 GMT+0000 (UTC)
  Git-Repo : https://github.com/zakarialaoui10/react-ziko.js
  Released under MIT License
*/

import React, { useRef, useEffect } from 'react';
import { ZikoUIElement } from 'ziko';

function ZikoUI({
  ui
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current && ui && ui instanceof ZikoUIElement) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(ui.element);
    }
  }, [ui]);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    "data-engine": "ziko"
  });
}

export { ZikoUI as default };
