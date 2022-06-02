import {derived, writable} from "svelte/store"
import {browser} from "$app/env"

function getLocalStorage<T>(key: string): T|null {
    try {
        return JSON.parse(window.localStorage.getItem(key)||"")
    } catch {
        return null
    }
}

export const volume = writable(getLocalStorage<number>("volume")||100)
export const paused = writable(true)
export const time = writable(0)
export const duration = writable(0)
export const speed = writable(1)
export const loading = writable(false)

export const togglePaused = () => {
    paused.update(p => !p)
}

volume.subscribe((v) => {
    browser && window.localStorage.setItem("volume", JSON.stringify(v))
})

declare global {
    interface Window {
        toggleLoading: () => void
    }
}

if(browser) {
    window.toggleLoading = () => {
        loading.update(l => !l)
    }
}
