import { derived, writable, get } from "svelte/store";
import { arrayMoveImmutable } from "array-move"
import { showControls } from "./controls";
import { filterFunc } from "./filterControl";
import { browser } from "$app/env";

export const queue = writable([] as Theme[])
export const animeList = writable([] as Anime[])
export const queueIndex = writable(0)

export const currentTheme = derived([queue, queueIndex], ([t, i]) => t[i])
export const currentAnime = derived(currentTheme, (t) => {
    return getAnimeFromTheme(t)
})

export function getAnimeFromTheme(t: Theme): Anime {
    let a = get(animeList)
    if(t.anime_idx)
        return a[t.anime_idx]
    else
        return {
            title: "Easter Egg"
        } as Anime
}

export function next(ff = get(filterFunc)) {
    queueIndex.update(i => {
        let q = get(queue)
        let nextIdx = i+1
        while(!ff(q[nextIdx])) {
            nextIdx++
            if(nextIdx >= q.length) {
                nextIdx = 0
            }
        }
        queue.set(arrayMoveImmutable(q, nextIdx, i+1))
        return i+1
    })
    showControls()
}

export function back() {
    queueIndex.update(i => {
        let nextIdx = i-1
        if(nextIdx <= -1) {
            nextIdx = get(queue).length-1
        }
        return nextIdx
    })
    showControls()
}

export async function setup() {
    // Load Anime
    let {anime} = await import("../assets/anime.json")
    animeList.set(anime)
    // Load Themes
    let tl = []
    for(var a of anime) {
        for(var t of a.themes) {
            tl.push(t)
        }
    }
    //Add Easter Eggs
    tl = await loadEggs(tl)
    //Shuffle
    tl = shuffle(tl)
    //Add Dev Theme
    if(import.meta.env.DEV) {
        let ethan = (await import("../assets/ethan.webm")).default
        tl.unshift(
            {
                title: "Ethan Mitai",
                link: ethan,
                type: "Unknown"
            }
        )
    }
    queue.set(tl)
}

async function loadEggs(tl: Theme[]): Promise<Theme[]> {
    const mutTl = tl.slice()
    const eggs = import.meta.globEager("/src/assets/eggs/*")
    const {data} = await import("../assets/eggdata.json")

    for(const eggPath in eggs) {
        let importPath = eggs[eggPath].default as string
        let eggDataKey = eggPath.split("\\").pop()?.split("/").pop()?.split(".").shift()
        if(import.meta.env.DEV)
            console.log("Attempting to add "+eggPath+" "+eggDataKey)
        if(eggDataKey !== undefined) {
            mutTl.push({
                ...data[eggDataKey],
                link: importPath
            } as EggTheme)
        }
    }
    return mutTl
}

function shuffle<T>(arr: T[]): T[] {
    var m = arr.length, t, i
    while(m) {
        i = Math.floor(Math.random() * m--)
        t = arr[m]
        arr[m] = arr[i]
        arr[i] = t
    }
    return arr
}

declare global {
    interface Window {
        iLikeToCheat: () => void
        skipToEgg: () => void
    }
}

if(browser) {
    window.iLikeToCheat = () => {
        console.log(get(queue))
    }
    
    window.skipToEgg = () => {
        next((t) => t.anime_idx === undefined)
    }
}