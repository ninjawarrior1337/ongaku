import { onMount } from "svelte"
import {writable} from "svelte/store"

export class LoveLiveUtils {
    private TODAY = new Date(Date.now())
    private idols = [] as Idol[]
    private IdolDataUrl = "https://bafybeidwsb5vnlocxvuwnkf5oxyyooam72cwbpgfcjljvayyuu23uthv5i.ipfs.dweb.link/lovelive.json"
    public async setup() {
        if (this.idols.length > 0) {
            return
        }
        let r = await fetch(this.IdolDataUrl)
        let j = await r.json()
        this.idols = j.idols
    }
    private getTZDayMonth(tz: string): [string, string] {
        var month = this.TODAY.toLocaleDateString("en-US", {
            timeZone: tz,
            month: "numeric"
        })
        var day = this.TODAY.toLocaleDateString("en-US", {
            timeZone: tz,
            day: "numeric"
        })

        return [month, day]
    }

    private checkBirthday(i: Idol, tz: string): boolean {
        const [iMonth, iDay] = i.birthday.split("/")
        const [tMonth, tDay] = this.getTZDayMonth(tz)
        if(tMonth == iMonth && tDay == iDay) {
            return true
        }
        return false;
    }

    public getBirthdayIdol(): Idol | null {
        //Check JP birthday first
        for(var i of this.idols) {
            if(this.checkBirthday(i, "Asia/Tokyo")) {
                return i
            }
        }
        //Check US birthdays if no JP birthdays exist
        for(var i of this.idols) {
            if(this.checkBirthday(i, "America/Los_Angeles")) {
                return i
            }
        }
        return null
    }
}

const LLUtils = new LoveLiveUtils()

export function useLoveLive() {
    let birthdayIdol = writable<Idol|null>(null)
    onMount(async () => {
        await LLUtils.setup()
        birthdayIdol.set(LLUtils.getBirthdayIdol())
    })
    return {idol: birthdayIdol}
}