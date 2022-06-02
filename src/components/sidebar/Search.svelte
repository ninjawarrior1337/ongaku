<template>
    <div class="px-4 space-y-4 w-full">
        <h2 class="text-4xl">Search</h2>
        <input class="bg-transparent border-b-2 text-2xl w-full" placeholder="Type the show name or song title..." value={$currentSearch} on:input={handleInput}>
    </div>
    <div class="w-full h-full overflow-hidden">
        <VirtualList items={results} let:item={anime}>
            <div class="from-true-gray-900 to-true-gray-800 bg-gradient-to-br rounded-lg p-2 mx-4 my-2">
                <p class="text-3xl mb-2">{anime.title}</p>
                <div class="space-y-1">
                    {#each anime.themes as theme}
                        <p class="text-xl cursor-pointer" on:click="{() => next((t) => t == theme)}">{theme.title}</p>
                    {/each}
                </div>
            </div>
        </VirtualList>
    </div>
</template>

<script lang=ts>
    import VirtualList from "@sveltejs/svelte-virtual-list"
    import Fuse from "fuse.js";
    import { debounce } from "lodash-es";
    import { animeList, next } from "$stores/queue";
    import { onMount } from "svelte";
    import { currentSearch } from "$stores/sidebar";
    let VList: Element|null
    let results = [] as Anime[]
    const fuse = new Fuse($animeList, {
        keys: [
            {
                name: "title",
                weight: 3
            }
        ]
    })

    onMount(() => {
        VList = document.getElementsByTagName("svelte-virtual-list-viewport")[0]
    })

    const handleInput = debounce((e) => {
        $currentSearch = (e.target as HTMLInputElement).value
    }, 250)

    $: {
        if($currentSearch !== "") {
            let res = fuse.search($currentSearch)
            results = res.map((v) => v.item)
        } else {
            results = $animeList.slice().sort((a,b) => a.title.localeCompare(b.title))
        }
        if(VList) {
            VList.scrollTo({top: 0})
        }
    }
</script>