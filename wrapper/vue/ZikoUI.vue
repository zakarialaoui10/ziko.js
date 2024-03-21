<template>
  <div ref="containerRef" data-engine="ziko">Test</div>
</template>
<script>
import {ZikoUIElement} from "ziko"
export default {
  props: {
    ui: Object
  },
  mounted() {
    if (this.$refs.containerRef && this.ui instanceof ZikoUIElement) {
      this.$refs.containerRef.innerHTML = "";
      this.$refs.containerRef.appendChild(this.ui.element);
    }
  }
};
</script>
