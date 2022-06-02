import { writable } from "svelte/store";
import { debounce } from "lodash-es";

const timeout = 3.5

export const controlsVisible = writable(true)

export const showControls = () => {
    if(import.meta.env.PROD) {
        handleMouseMoveTrailing()
        handleMouseMoveLeading()
    }
}

const handleMouseMoveTrailing = debounce(() => {
    controlsVisible.set(false)
}, timeout*1000, {trailing: true, leading: false})
    
const handleMouseMoveLeading = debounce(() => {
    controlsVisible.set(true)
}, timeout*1000, {leading: true, trailing: false})