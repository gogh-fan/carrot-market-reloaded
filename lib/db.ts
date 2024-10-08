import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function existUsername(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
}
export async function existUserEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
}

export async function existGithubId(github_id: string) {
  return await db.user.findUnique({
    where: {
      github_id,
    },
    select: {
      id: true,
    },
  });
}

export async function createGithubUser(
  username: string,
  github_id: string,
  avatar: string,
  email: string
) {
  const isExistUsername = await existUsername(username);
  const isExistUserEmail = await existUserEmail(email);
  if (isExistUsername) {
    return await db.user.create({
      data: {
        username: username + Date.now(),
        github_id,
        avatar,
        email: !isExistUserEmail ? email : null,
      },
      select: {
        id: true,
      },
    });
  } else {
    return await db.user.create({
      data: {
        username: username,
        github_id,
        avatar,
        email: !isExistUserEmail ? email : null,
      },
      select: {
        id: true,
      },
    });
  }
}

export default db;
