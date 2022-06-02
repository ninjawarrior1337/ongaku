<script lang="ts">
import { browser } from "$app/env";

    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    let gamepads = [] as Gamepad[]
    let lastTimestamp = 0
    let lastAnimFrame = 0
    const dispatch = createEventDispatcher()

    interface Mapping {
        [key: string]: number
    }

    const standardMappings = {
        "next": 5,
        "back": 4,
        "togglePlay": 1
    } as Mapping

    const mozMappings = {
        "next": 6,
        "back": 5,
        "togglePlay": 1
    } as Mapping

    function handleGamepadConnect(e: GamepadEvent) {
        gamepads[e.gamepad.index] = e.gamepad
    }
    function handleGamepadDisconnect(e: GamepadEvent) {
        delete gamepads[e.gamepad.index]
    }

    function handleInputs() {
        for(var gamepad of navigator.getGamepads()) {
            if(!gamepad) {
                continue
            }
            let currentMapping: Mapping
            if(gamepad.mapping !== "standard") {
                currentMapping = mozMappings
            } else {
                currentMapping = standardMappings
            }
            for(var key of Object.keys(currentMapping)) {
                if(gamepad.buttons[currentMapping[key]].pressed && lastTimestamp < gamepad.timestamp) {
                    dispatch(key)
                }
            }
            lastTimestamp = gamepad.timestamp
        }
        lastAnimFrame = requestAnimationFrame(handleInputs)
    }

    onMount(() => {
        if(browser) {
            window.addEventListener("gamepadconnected", handleGamepadConnect)
            window.addEventListener("gamepaddisconnected", handleGamepadDisconnect)
            lastAnimFrame = requestAnimationFrame(handleInputs)
        }
    })

    onDestroy(() => {
        if(browser) {
            window.removeEventListener("gamepadconnected", handleGamepadConnect)
            window.removeEventListener("gamepaddisconnected", handleGamepadDisconnect)
            cancelAnimationFrame(lastAnimFrame)
        }
    })
</script>