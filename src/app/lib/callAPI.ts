import {deleteToken, getToken} from "@/app/lib/session";

export default async function callAPI<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endPoint: string,
  body?: Record<string, any>,
  headers: Record<string, string> = {}
) {
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzM4Mzk3MzYyLCJleHAiOjE3Mzg0ODM3NjJ9.zzd_rKKvD5_0NRycRE8EHMvvlolpHHbytV6RCXLm464";
  const token = await getToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/${endPoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: token ? `Bearer ${token}` : "",
      ...headers,
    },
    body: method !== "GET" ? JSON.stringify(body) : undefined, // GET 요청은 body 필요 없음
  })

  if (!response.ok) {
    if (response.status === 401) {
      await deleteToken();
    }
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}