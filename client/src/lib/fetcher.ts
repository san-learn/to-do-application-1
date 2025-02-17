"use server";

import { SERVER_BASE_API_URL } from "./const";

export async function fetcher([APIEndpoint, options]: [string, RequestInit]) {
  const response = await fetch(SERVER_BASE_API_URL + APIEndpoint, {
    method: options.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: options.body ? options.body : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
