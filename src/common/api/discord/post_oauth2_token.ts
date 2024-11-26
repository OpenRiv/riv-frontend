import { discordClient } from "./discord_client";

export async function postOauth2Token(code: string): Promise<string> {
  try {
    const response = await discordClient.post(
      "/oauth2/token",
      new URLSearchParams({
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access_token } = response.data;
    if (access_token) {
      localStorage.setItem("accessToken", access_token);
    } else {
      throw new Error("Access token not found in response");
    }

    return access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to fetch access token");
  }
}
