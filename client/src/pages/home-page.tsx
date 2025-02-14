import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export function HomePage() {
  const { data, error, isLoading, mutate } = useSWR(
    ["/api/todos/", { method: "GET" }],
    fetcher
  );

  if (error) {
    return <div>Failed to load {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
}
