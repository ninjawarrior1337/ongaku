<template>
    <button on:click={cycleFilter} title={"Bruh"}>
        {#if $filterFuncIndex < 3}
        <svg height=32 width=32>
            <circle cx=16 cy=16 r=16 fill="white"></circle>
            <rect x={rectOffset} y=0 width=16 height=32 class="fill-current text-true-gray-900"></rect>
        </svg>
        {:else if $filterFuncIndex === 3}
        <Fa icon={faStar} size=2x></Fa>
        {/if}
    </button>
</template>

<script lang="ts">
    import { faStar } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa"
    import { cycleFilter, filterFuncIndex } from "$stores/filterControl";
    let rectOffset = 0
    $: {
        switch($filterFuncIndex) {
            case 0: rectOffset = -16; break;
            case 1: rectOffset = 16; break;
            case 2: rectOffset = 0; break;
        }
    }
</script>