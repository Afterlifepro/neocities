<script>

    import { apps } from "../store";

    export let app;
    export let props = {};

</script>

<button on:click={() => {apps.newApp = app}} {...props}><slot /></button>