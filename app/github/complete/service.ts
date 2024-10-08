interface getAccessTokenResponse {
  error?: any;
  access_token?: string;
}
export async function getAccessToken(code: string): Promise<getAccessTokenResponse> {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  return await accessTokenResponse.json();
}

interface getUserProfileResponse {
  id: number;
  avatar_url: string;
  login: string;
}
export async function getUserProfile(access_token: string): Promise<getUserProfileResponse> {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
  return await userProfileResponse.json();
}

export async function getuserEmail(access_token: string) {
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache",
  });
  return await userEmailResponse.json();
}
