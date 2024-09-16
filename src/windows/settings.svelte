<script>
  import settings from "../settings.ts";
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
    on:change={(e) => settings.scale = parseFloat((e.target).value)}
  />
  <label for="pixel">Custom Fonts</label><input
    id="pixel"
    name="pixel"
    type="checkbox"
    bind:checked={settings.pixel}
    on:change={e => settings.pixel = e.target.checked}
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
    & label{
      padding-right: 0.4rem;
    }
    & input {
      max-width: 100%;
    }
  }
</style>
