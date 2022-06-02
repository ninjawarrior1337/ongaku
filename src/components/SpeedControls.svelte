<template>
    <button on:click={cycleSpeed}>
        <p class="text-4xl">{$speed.toFixed(2)}x</p>
    </button>
</template>

<script lang="ts">
import {speed} from "$stores/player"
let speeds = [0.25, 0.5, 1, 1.5, 2]
let currSpeedIndex = 2
$: {
    speed.set(speeds[currSpeedIndex])
}
function cycleSpeed() {
    currSpeedIndex = (currSpeedIndex+1) % speeds.length
}
</script>