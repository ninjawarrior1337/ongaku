declare module "*anime.json" {
    let anime: Anime[]
    export {
        anime
    }
}

declare module "*eggdata.json" {
    let data: {
        [key: string]: EggTheme
    }
    export {
        data
    }
}

type FilterFunc = (t: Theme) => boolean

interface Anime {
    title: string
    mal_link?: string
    themes: Theme[]
}

type ThemeType = "OP" | "ED" | "Unknown" | string

interface Theme {
    title: string
    link: string
    type: ThemeType,
    anime_idx?: number
}

interface EggTheme extends Theme {
    sauce?: string
}

declare module "@sveltejs/svelte-virtual-list" {
    import {SvelteComponentTyped} from "svelte"
    //For some reason, generics don't work here. Weird
    type T = Anime
    export default class VirtualList extends SvelteComponentTyped<{items: T[]}, {}, {default: {item: T}}> {}
}

interface Idol {
    name: string,
    color: string,
    birthday: string
}