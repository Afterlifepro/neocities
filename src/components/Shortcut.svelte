<script>
  import { apps } from "../store";

  export let icon = "";
  export let href;
  export let name;
  export let external = false;
</script>

<button
  class="shortcut"
  on:click={!external
    ? () => {
        apps.newApp = { template: href, source: "shortcut" };
      }
    : () => {
        window.open(href);
      }}
>
  <img src={icon} alt="" />
  <h1>
    {name}
    {#if external}
      <img src={icon} alt="external" />
    {/if}
  </h1>
</button>

