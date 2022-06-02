<template>
    <video class="fixed w-screen h-screen"
        transition:fly={{y:-200}}
        bind:volume={vol} 
        bind:paused={$paused}
        bind:currentTime={$time}
        bind:playbackRate={$speed}
        bind:duration={d}
        on:waiting={handleWaiting}
        on:playing={handlePlaying}
        on:loadstart={handleWaiting}
        on:loadeddata={handlePlaying}
        on:ended={() => next()}
        autoplay={$queueIndex > 0}
        src={debouncedCurrentTheme.link}
    >
        <track kind="captions">
    </video>
</template>

<script lang="ts">
    import {volume, paused, time, duration, speed, loading} from "$stores/player"
    import {currentTheme, next, queue, queueIndex} from "$stores/queue"
    import { derived } from "svelte/store";
    import {fly} from "svelte/transition"
    import { debounce } from "lodash-es";
    function handleWaiting() {
        loading.set(true)
    }
    function handlePlaying() {
        loading.set(false)
    }
    const scaledVolume = derived(
        volume, v => Math.pow(v/100, 4)
    )
    let vol = 0
    $: vol = $scaledVolume
    //This fixes a problem with typescript when because bind:duration is readonly
    let d = 0
    $: {
        duration.set(d)
    }
    //Allow the next and back buttons to be spammed
    let debouncedCurrentTheme: Theme = $queue[0]
    const endDebouncedCurrentTheme = debounce((t: Theme) => {
        debouncedCurrentTheme = t
    }, 750, {trailing: true, leading: false})
    const startDebouncedCurrentTheme = debounce(() => {
        debouncedCurrentTheme = {link: ""} as Theme
    }, 750, {trailing: false, leading: true})
    $: {
        startDebouncedCurrentTheme()
        endDebouncedCurrentTheme($currentTheme)
    }
</script>