<template>
    {#if $controlsVisible || isMouseOver}
    <div 
        on:mouseenter="{() => isMouseOver=true}"
        on:mouseleave="{() => isMouseOver=false}"
        transition:fly={{y: 200, duration: 250}} 
        class="fixed bottom-5 left-3 p-3 shadow-xl rounded-xl flex flex-col bg-true-gray-900 backdrop-filter bg-opacity-75 backdrop-blur-lg min-w-72 shadow-2xl"
    >
        <ProgressBar></ProgressBar>
        <span class="text-xl">
            {#if $loading}
                <svg transition:fly={{x: -24, duration: 200}} class="animate-spin inline w-6 h-6 -mt-1 mr-1" viewBox="0 0 24 24">
                    <circle cx=12 cy=12 r=10 stroke-width=4 class="text-white opacity-25" stroke="currentColor"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            {/if}
            {$currentTheme.title}
        </span>
        <a class="text-lg underline" target="_blank" href={$currentAnime.mal_link || currentEggTheme.sauce}>{$currentAnime.title}</a>
        <p>Volume: {$volume}%</p>
        <p>Version: {import.meta.env.VITE_VERSION}</p>
        <div class="p-1"></div>
        <div class="flex flex-row items-center justify-evenly space-x-4">
            <FilterControl/>
            <button on:click={() => {back(); showControls()}}>
                <Fa size="3x" icon={faChevronLeft}></Fa>
            </button>
            <button on:click={() => {paused.update(p => !p)}}>
                {#if $paused}
                <Fa size="2x" icon={faPlay}></Fa>
                {:else}
                <Fa size="2x" icon={faPause}></Fa>
                {/if}
            </button>
            <button on:click={() => {next(); showControls()}}>
                <Fa size=3x icon={faChevronRight}></Fa>
            </button>
            <button on:click={() => toggleFavorite($currentTheme)}>
                <Fa size=2x icon={faStar} color={`${$isCurrentThemeFavorite?"gold":""}`}></Fa>
            </button>
            <SpeedControls></SpeedControls>
        </div>
    </div>
    {/if}
    <Gamepad 
        on:togglePlay={() => {togglePaused(); showControls()}} 
        on:next={() => {next(); showControls()}}
        on:back={() => {back(); showControls()}}>
    </Gamepad>
</template>

<svelte:window on:wheel={handleScroll} on:keypress={handleKeyPress} on:mousemove={showControls}></svelte:window>

<script lang="ts">
import Fa from "svelte-fa/src/fa.svelte"
import {faPlay, faChevronLeft, faChevronRight, faPause, faStar} from "@fortawesome/free-solid-svg-icons"
import {fly} from "svelte/transition"
import {volume, paused, loading, duration, togglePaused} from "$stores/player"
import {currentTheme, currentAnime, next, back} from "$stores/queue"
import SpeedControls from "./SpeedControls.svelte"
import ProgressBar from "./ProgressBar.svelte"
import FilterControl from "./FilterControl.svelte"
import { isOpen, isOverSidebar } from "$stores/sidebar"
import Gamepad from "./helpers/Gamepad.svelte"
import { favorites, isFavorite, toggleFavorite } from "$stores/favorites";
import { controlsVisible, showControls } from "$stores/controls";
import { derived } from "svelte/store";
import { browser } from "$app/env";

let currentEggTheme: EggTheme;
let isMouseOver = false
const isCurrentThemeFavorite = derived([favorites, currentTheme], ([_, t]) => isFavorite(t))

$: currentEggTheme = ($currentTheme as EggTheme)

$: {
    if(browser) {
        let root = document.getElementsByTagName("body")[0]!!
        root.style.cursor = $controlsVisible?"auto":"none"
    }
}

function handleKeyPress(e: KeyboardEvent) {
    if($isOpen) {
        return
    }
    showControls()
    if(e.key === "n") {
        next()
    } else if(e.key === "b") {
        back()
    } else if (e.key === " ") {
        paused.update(p => !p)
    }
}

function handleScroll(e: WheelEvent) {
    if($isOverSidebar) {
        return
    }
    volume.update((v) => {
        if(e.deltaY>0) {
            let newV = v - 3
            if(newV < 0) {
                newV = 0
            }
            return newV
        } else {
            let newV = v + 3
            if(newV > 100) {
                newV = 100
            }
            return newV
        }
    })
}
</script>

<style>

</style>