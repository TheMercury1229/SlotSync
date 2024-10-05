import { conformZodMessage } from "@conform-to/zod";
import z from "zod";
export const onBoardingSchema = z.object({
  fullName: z.string().min(3).max(150),
  username: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contain letters, numbers, and dashes.",
    }),
});

export const onBoardingSchemaValidation = (options?: {
  isUsernameUnique: () => Promise<boolean>;
}) => {
  return z.object({
    username: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can only contain letters, numbers, and dashes.",
      })
      .superRefine((_, ctx) => {
        if (typeof options?.isUsernameUnique !== "function") {
          ctx.addIssue({
            code: "custom",
            message: conformZodMessage.VALIDATION_UNDEFINED,
            fatal: true,
          });
          return;
        }

        return options.isUsernameUnique().then((isUnique) => {
          if (!isUnique) {
            ctx.addIssue({
              code: "custom",
              message: "Username already exists.",
              fatal: true,
            });
          }
        });
      }),
    fullName: z.string().min(3).max(150),
  });
};
