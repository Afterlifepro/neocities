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
  <input
    id="scale"
    name="scale"
    type="range"
    min="0.5"
    max="3"
    step="0.5"
    value={settings.scale}
    on:change={scale}
  />
  <label for="scale">Scale</label>
  <input
    id="pixel"
    name="pixel"
    type="checkbox"
    bind:checked={settings.pixel}
    on:change={font}
    data-toggle
  />
  <label for="pixel">Pixel Fonts</label>
</form>

<style>
  form {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    grid-auto-rows: max-content;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    & label {
      padding-left: 0.4rem;
    }
    & input {
      max-width: 100%;
      margin-inline: auto;
    }
  }

  label[for="scale"]::after {
    content: "  (" var(--scale-str, "1") ")";
  }
</style>
