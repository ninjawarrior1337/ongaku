<template>
    <div 
        on:mouseenter="{() => isOverSidebar.set(true)}"
        on:mouseleave="{() => isOverSidebar.set(false)}" 
        class="fixed h-full w-screen lg:w-4/12 flex flex-col space-y-4 right-0 bg-black bg-opacity-60 backdrop-filter backdrop-blur-2xl rounded-l-lg shadow transition-all ease-in-out duration-250 transform {$isOpen?``:`translate-x-full`}"
    >
        <div class="grid grid-cols-2 mr-12 mt-2">
            {#each tabs as tab}
                <button on:click={() => {currentTab = tab}} class="text-xl bg-gradient-to-br from-true-gray-800 to-true-gray-900 rounded p-2 mx-4 my-2">{tab}</button>
            {/each}
        </div>
        {#if currentTab === "Search"}
            <Search></Search>
        {:else if currentTab === "Favorites"}
            <Favorites></Favorites>
        {/if}
    </div>
    <button on:click={() => isOpen.update(o => !o)} class="fixed top-5 right-5">
        {#if $isOpen} 
        <Fa size="2x" icon={faTimes}></Fa>
        {:else}
        <Fa size="2x" icon={faBars}></Fa>
        {/if}
    </button>
</template>

<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
    import {faTimes, faBars} from "@fortawesome/free-solid-svg-icons";
    import {isOpen, isOverSidebar} from "$stores/sidebar"
    import Favorites from "./Favorites.svelte";
    import Search from "./Search.svelte";

    let tabs = ["Search", "Favorites"]
    let currentTab = "Search"
</script>