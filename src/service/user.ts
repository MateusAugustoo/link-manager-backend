import { prisma } from "../prisma";
import { TUser } from "../types/TUser";

const createUser = async ({ uid, username, photo, email, name }: TUser) => {
  const user = await prisma.user.create({
    data: {
      uid,
      username,
      photo,
      email,
      name
    }
  })

  return user
}

const getUserByUid = async (uid: string) => {}

export { createUser }