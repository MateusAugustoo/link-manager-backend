import z from "zod";
import { TFastifyInstance } from "../types/TFastifyInstance";
import { prisma } from "../prisma";

export async function userRouters(app: TFastifyInstance) {
    app.post("/user", {
    schema: {
      body: z.object({
        uid: z.string(),
        photo: z.string().optional(),
        email: z.string().email(),
        name: z.string().optional(),
      }),
      description: "This route creates a new user with the provided uid, email, and optional photo and name fields.",
    }
  }, async () => {});
}
