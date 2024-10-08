import db, { createGithubUser, existGithubId, existUsername } from "@/lib/db";
import { getSession, sessionLogin } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getAccessToken, getuserEmail, getUserProfile } from "./service";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }

  const { error, access_token } = await getAccessToken(code);
  if (error || !access_token) {
    return new Response(null, {
      status: 400,
    });
  }

  const emails = await getuserEmail(access_token);
  let userEmail = "";
  for (const email of emails) {
    if (email.primary) {
      userEmail = email.email;
      break;
    }
  }
  const { id, avatar_url: avatar, login: username } = await getUserProfile(access_token);
  const github_id = id.toString();

  const user = await existGithubId(github_id);
  if (user) {
    await sessionLogin(user.id);
  } else {
    const newUser = await createGithubUser(username, github_id, avatar, userEmail);
    await sessionLogin(newUser.id);
  }

  return redirect("/profile");
}
