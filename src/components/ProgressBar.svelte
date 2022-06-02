<template>
    <div class="pb-1" style="--base-color: {baseColor}; --dark-color: {darkColor}; --darker-color: {darkerColor}">
        <input class="bg-gray-900 w-full rounded-xl" role="progressbar" type="range" step=0.01 min=0 max={$duration||100} bind:value={$time}>
        <div class="flex w-full font-bold">
            <p id="leading-time" class="self-start px-2 rounded-xl">{durationToMMSS($time)}</p>
            <div class="flex-grow"></div>
            <p id="trailing-time" class="self-end px-2 rounded-xl">{durationToMMSS($duration)}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import { useLoveLive } from "$lib/lovelive";
    import {duration, time} from "$stores/player"
    const {idol} = useLoveLive()
    $: baseColor = $idol?.color || "#3399ff"
    $: darkColor = lightenDarkenColor(baseColor, -30)
    $: darkerColor = lightenDarkenColor(baseColor, -69)
    function durationToMMSS(time: number): string {
        let min = Math.floor(time / 60)
        let sec = Math.round(time % 60)
        return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    }
    function lightenDarkenColor(color: string, percent: number) {
  	    var num = parseInt(color.replace("#",""), 16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		B = (num >> 8 & 0x00FF) + amt,
		G = (num & 0x0000FF) + amt;

		return "#"+(0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    };
</script>

<style lang="scss">
    @mixin track() {
        appearance: none;
        border-color: var(--dark-color);
        background-color: var(--darker-color);
        border-style: solid;
        border-width: 2px;
        border-radius: 20px;
        height: 18px;
        padding: 0px;
    }

    @mixin thumb() {
        appearance: none;
        background-color: var(--base-color);
        border-style: none;
        height: 14px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        width: 14px;
        border-radius: 50%;
        margin-top: -5;
    }

    #leading-time,#trailing-time {
        color: var(--base-color);
        background-color: var(--darker-color);   
    }

    input[type=range] {
        appearance: none;
        height: 18px;
        &::-webkit-slider-thumb {
            @include thumb
        }
        
        &::-moz-range-thumb {
            @include thumb
        }

        &::-webkit-slider-runnable-track {
            @include track
        }
        
        &::-moz-range-track {
            @include track
        }
    }
</style>