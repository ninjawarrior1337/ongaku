import { writable } from "svelte/store";

export const isOpen = writable(false)
export const isOverSidebar = writable(false)
export const currentSearch = writable("")