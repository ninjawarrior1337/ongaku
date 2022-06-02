<script>
    import "virtual:windi.css"
    import Player from "$components/Player.svelte"
    import Controls from "$components/Controls.svelte"
    import { setup } from "$stores/queue";
    import Sidebar from "$components/sidebar/Sidebar.svelte";

    let setupPromise = setup()
</script>

{#await setupPromise then _}
    <Player></Player>
    <Controls></Controls>
    <Sidebar></Sidebar>
{/await}