export { usePersistentState }

import { useEffect, useState } from "react"
import { isClient } from "./isClient"
import { useUpdateEffect } from "./useUpdateEffect"

// Stores the state value in the window object so that it persists across page navigation.
// Updates the state value automatically when the key changes searching from the global object.
function usePersistentState(valueFn, key) {
    const windowKey = `_state-${key}`
    const [state, setState] = useState(() => {
        if(isClient) return window[windowKey] ?? valueFn()
        return valueFn()
    })
    useUpdateEffect(() => { setState(window[windowKey] ?? valueFn()) }, [key])
    useEffect(() => { window[windowKey] = state }, [state])
    return [state, setState]
}