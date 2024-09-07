<script lang="ts">
  import { apps } from "../store";

  export let app:
    | {
        title: any;
        content: any;
        source: any;
      }
    | {
        template: any;
        source: any;
      };
  export let props = {};
</script>

<button
  on:click={() => {
    apps.newApp = app;
  }}
  {...props}><slot /></button
>
