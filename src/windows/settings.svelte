<script lang="ts">
  // change event handler does not work as svelte/elements makes vite throw up
  // import { type ChangeEventHandler } from "svelte/elements";
  import settings from "../settings.ts";

  /**
   * @type {import("svelte/elements").ChangeEventHandler<HTMLInputElement>}
   */
  const scale = (event) =>
    (settings.scale = parseFloat(event.currentTarget.value));
  /**
   * @type {import("svelte/elements").ChangeEventHandler<HTMLInputElement>}
   */
  const font = (event) => (settings.pixel = event.currentTarget.checked);
</script>

<form>
  <label for="scale">Scale</label><input
    id="scale"
    name="scale"
    type="range"
    min="0.5"
    max="3"
    step="0.1"
    value={settings.scale}
    on:change={scale}
  />
  <label for="pixel">Pixel Fonts</label><input
    id="pixel"
    name="pixel"
    type="checkbox"
    bind:checked={settings.pixel}
    on:change={font}
    data-toggle
  />
</form>

<style>
  form {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    grid-auto-rows: max-content;
    width: 100%;
    height: 100%;
    & label {
      padding-right: 0.4rem;
    }
    & input {
      max-width: 100%;
    }
  }

  label[for="scale"]::after {
    content: "  (" var(--scale-str, "1") ")";
  }
</style>
