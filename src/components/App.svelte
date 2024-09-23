<script lang="ts">
  import log from "../logs";
  import { apps, type newApp } from "../store";

  export let app:newApp;
  export let props: { [key: string]: any } = {};
</script>

<!-- 
@component
renders a button which opens the app passed to the `app` prop 
the props prop is passed straight to the button
-->
<button
  on:click={() => {
    log("using App.svelte", "darkslategray");
    apps.newApp = app;
  }}
  {...props}
>
  <slot />
</button>
