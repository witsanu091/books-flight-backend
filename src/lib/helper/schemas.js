const { z } = require("zod");

const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

const userSchema = z.object({
  // user_id: z.string().uuid().optional(),
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  email: z.string().email(),
  dob: z
    .string()
    .regex(dateTimeRegex, "Date must be in the format YYYY-MM-DD HH:mm:ss")
    .optional(),
  mobile: z
    .string()
    .regex(/^[0-9]+$/)
    .min(10)
    .max(15)
    .optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  user_name: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
  created_on: z
    .string()
    .regex(dateTimeRegex, "Date must be in the format YYYY-MM-DD HH:mm:ss")
    .default(() => new Date().toISOString().slice(0, 19).replace("T", " ")),
  updated_on: z
    .string()
    .regex(dateTimeRegex, "Date must be in the format YYYY-MM-DD HH:mm:ss")
    .default(() => new Date().toISOString().slice(0, 19).replace("T", " ")),
  enabled: z.boolean().default(true),
  user_role: z.string().min(2).max(20),
});

const userSignInSchema = z.object({
  user_name: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
  user_role: z.string().min(2).max(20),
});

const searchFlightSchema = z.object({
  airport_take_off: z.string().uuid(),
  airport_landing: z.string().uuid(),
  flight_date: z.string(),
  // .regex(dateTimeRegex, "Date must be in the format YYYY-MM-DD HH:mm:ss"),
});

module.exports = {
  userSchema,
  userSignInSchema,
  searchFlightSchema,
};
