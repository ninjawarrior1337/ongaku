<template>
    <div class="px-4 space-y-4 w-full">
        <h2 class="text-4xl">Favorites</h2>
    </div>
    <div class="w-full h-full overflow-y-scroll">
        {#each $favorites as fav}
        <div class="flex items-center from-true-gray-900 to-true-gray-800 bg-gradient-to-br rounded p-2 m-4">
            <div on:click={() => next((t) => t.link === fav.link)} class="mb-2 cursor-pointer">
                <p class="text-3xl">{fav.title}</p>
                <p class="text-2xl">{getAnimeFromTheme(fav).title}</p>
            </div>
            <div class="flex-grow"></div>
            <Fa class="mr-2" icon={faTrash} size=2x></Fa>
        </div>
        {/each}   
    </div>
</template>

<script lang="ts">
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Fa from "svelte-fa"
import {favorites} from "$stores/favorites"
import {animeList, getAnimeFromTheme, next} from "$stores/queue"

</script>