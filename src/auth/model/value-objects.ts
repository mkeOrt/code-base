import { z } from "zod";

export const LogInCredentials = z.object({
  username: z.string().trim().min(3).max(255),
  password: z.string().min(8).max(255),
});

export type LogInCredentialsType = z.infer<typeof LogInCredentials>;
