<ziko-ui bind:this={containerRef} data-engine="ziko"></ziko-ui>

<script>
  import { onMount } from 'svelte';
  import {ZikoUIElement} from "ziko";
  let containerRef;
  
  onMount(() => {
    if (containerRef && ui instanceof ZikoUIElement) {
      containerRef.innerHTML = "";
      containerRef.appendChild(ui.element);
    }
  });
  export let ui;
</script>
