<template>
  <ziko-ui ref="containerRef" data-engine="ziko"></ziko-ui>
</template>
<script>
import {ZikoUIElement} from "ziko"
export default {
  props: {
    ui: Object
  },
  mounted() {
    //globalThis.__ZikoConfig__.setDefault({render:false})
    if (this.$refs.containerRef && this.ui instanceof ZikoUIElement) {
      this.$refs.containerRef.innerHTML = "";
      this.$refs.containerRef.appendChild(this.ui.render(false).element);
    }
  }
};
</script>
<style scoped>
  ziko-ui{
    display:block;
  }
</style>
