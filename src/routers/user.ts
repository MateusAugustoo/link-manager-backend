import z from "zod";
import { TFastifyInstance } from "../types/TFastifyInstance";
import { TUser } from "../types/TUser";
import { createUser } from "../service/user";
import { authMiddleware } from "../middleware/authTokenUser";

export async function userRouters(app: TFastifyInstance) {
  app.post(
    "/user",
    {
      preHandler: [authMiddleware],
      schema: {
        body: z.object({
          uid: z.string(),
          username: z.string(),
          photo: z.string().optional(),
          email: z.string().email(),
          name: z.string().optional(),
        }),
        description:
          "This route creates a new user with the provided uid, email, and optional photo and name fields.",
        tags: ["User"],
      },
    },
    async (request, reply) => {
      try {
        const { uid, username, photo, email, name } = request.body as TUser;
        const user = await createUser({ uid, username, photo, email, name });

        return reply.code(201).send(user);
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          reply.code(400).send({ message: error.message });
        }
        reply.code(500).send({ message: "Internal server error" });
      }
    }
  );

  app.get(
    "/user/:uid",
    {
      schema: {
        params: z.object({
          uid: z.string(),
        }),
        description: "This route returns a user by their uid.",
        tags: ["User"],
      },
    },
    async (request, reply) => {
      const { uid } = request.params as { uid: string };
    }
  );
}
