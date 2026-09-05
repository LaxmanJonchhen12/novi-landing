/**
 * Deliberately NOT in the `"use server"` file. Every export from a server
 * action module becomes a callable server endpoint, so such a file may only
 * export async functions — exporting this object from there threw
 * "A 'use server' file can only export async functions, found object" at
 * runtime, while `next build` still passed.
 */
export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const subscribeInitialState: SubscribeState = {
  status: "idle",
  message: "",
};
