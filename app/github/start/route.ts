export async function GET() {
  const baseURL = "https://github.com/login/oauth/authorize";
  const formattedParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
  }).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return Response.redirect(finalUrl);
}
