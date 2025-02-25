import { useEffect, useState } from "react";

import { SERVER_BASE_API_URL } from "@/lib/const";

export function useGetUser() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          SERVER_BASE_API_URL + "/api/authentication/get-user",
          { method: "GET", credentials: "include" }
        );

        if (!response.ok) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }

    getUser();
  }, []);

  return isAuthenticated;
}
