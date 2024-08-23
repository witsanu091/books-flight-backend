const { z } = require("zod");

const userSchema = z.object({
  user_id: z.string().uuid().optional(),
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  email: z.string().email(),
  dob: z.date().optional(),
  mobile: z
    .string()
    .regex(/^[0-9]+$/)
    .min(10)
    .max(15)
    .optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  user_name: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
  created_on: z.date().default(new Date()),
  updated_on: z.date().default(new Date()),
  enabled: z.boolean().default(true),
});

module.exports = {
  userSchema,
};
