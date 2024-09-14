<script lang="ts">
  import { apps } from "../store";

  export let icon: string = "";
  export let href: string;
  export let name: string;
  export let external: boolean = false;
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
  <figure data-shortcut>
    <img src={icon} alt="" />
    <figcaption>
      {name}
      {#if external}
        <img
          src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.P-WOfNxAAO0DlrRr2ekF3QHaHa%26pid%3DApi&f=1&ipt=cbe6e31d5b44d1a8086aaa03acbb6d83770dfa15e5ead9f8251cff64ccc58891&ipo=images"}
          alt="external"
        />
      {/if}
    </figcaption>
  </figure>
</button>

<style>
  .shortcut {
    appearance: none;
    background-color: transparent;
    border: none;
    & img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }
    & figcaption {
      font-size: 1.5rem;
    }
    & img:not([alt=""]) {
      height: 1rem;
    }
  }
</style>
