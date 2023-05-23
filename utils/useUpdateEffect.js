export {useUpdateEffect}

import { useEffect, useRef } from "react";

// Calls effect only on dependencies update, not on mount.
function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);
  
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      }
    }, dependencies);
  }