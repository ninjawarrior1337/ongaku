import { derived, get, writable } from "svelte/store";
import { isFavorite } from "./favorites";

const filterFuncs = [
    () => true,
    t => t.type === "OP" || t.type === "Unknown",
    t => t.type === "ED"|| t.type === "Unknown",
    t => isFavorite(t)
] as FilterFunc[]

export const filterFuncIndex = writable(0)
export const filterFunc = derived(filterFuncIndex, ffi => filterFuncs[ffi])

export const cycleFilter = () => {
    filterFuncIndex.set((get(filterFuncIndex)+1) % filterFuncs.length) 
}