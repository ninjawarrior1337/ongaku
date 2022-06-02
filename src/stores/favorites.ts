import { derived, get, writable } from "svelte/store";
import { currentTheme } from "./queue";
import {browser} from "$app/env"

export const favorites = writable(loadFavorites())

function loadFavorites(): Theme[] {
    let storedFavorites;
    try {
        if(browser) {
            storedFavorites = window.localStorage.getItem("favorites")
            if(storedFavorites !== null) {
                return JSON.parse(storedFavorites)
            }
        }
    }
    finally {}
    return []
}

export function toggleFavorite(t: Theme) {
    favorites.update(f => {
        let favIndex = findFavorite(t)
        if(favIndex !== -1) {
            let newF = f.slice()
            newF.splice(favIndex, 1)
            return newF
        } else {
            return [...f, t]
        }
    })
}

export function isFavorite(t: Theme): boolean {
    for(const f of get(favorites)) {
        if(f.link === t.link) {
            return true
        }
    }
    return false
}

export function findFavorite(t: Theme): number {
    let fl = get(favorites)
    for(const [i, f] of fl.entries()) {
        if(f.link === t.link) {
            return i
        }
    }
    return -1
}

browser && favorites.subscribe(f => {
    window.localStorage.setItem("favorites", JSON.stringify(f))
})