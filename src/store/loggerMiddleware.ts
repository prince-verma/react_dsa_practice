import type { Middleware } from "@reduxjs/toolkit";

interface Action {
  type: string;
  payload?: unknown;
  [key: string]: unknown;
}

export const logger: Middleware = () => (next) => (action) => {
  if (typeof action === "object" && action !== null && "type" in action) {
    const { type, payload } = action as Action;
    console.log(`Logs: ${type} - ${payload}`);
  }
  return next(action);
};
