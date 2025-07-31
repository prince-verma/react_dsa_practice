import { useReducer, useEffect, useRef } from "react";

const STATE_MAP = new WeakMap();
export default function useMyState(initialValue) {
  let localHookId = useRef({});
  const [, reRenderer] = useReducer(() => {});

  // Initialize state for this component+hook instance
  if (!STATE_MAP.has(localHookId.current)) {
    STATE_MAP.set(localHookId.current, initialValue);
  }

  function setValue(newValue) {
    const stateValue = STATE_MAP.get(localHookId.current);
    if (stateValue !== newValue) {
      STATE_MAP.set(localHookId.current, newValue);
      reRenderer({});
    }
  }

  useEffect(() => {
    const key = localHookId.current;
    return () => {
      STATE_MAP.delete(key);
    };
  }, []);

  return [STATE_MAP.get(localHookId.current), setValue];
}
