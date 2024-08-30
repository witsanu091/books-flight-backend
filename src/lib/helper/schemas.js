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
    .default(() => new Date().toISOString().slice(0, 19).replace("T", " "))
    .optional(),
  updated_on: z
    .string()
    .regex(dateTimeRegex, "Date must be in the format YYYY-MM-DD HH:mm:ss")
    .default(() => new Date().toISOString().slice(0, 19).replace("T", " "))
    .optional(),
  enabled: z.boolean().default(true),
  user_role: z.string().min(2).max(20),
});

const userSignInSchema = z.object({
  user_name: z.string().min(3).max(255).optional(),
  email: z.string().min(3).optional(),
  password: z.string().min(8).max(255),
  user_role: z.string().min(2).max(20),
});

const searchFlightSchema = z.object({
  airport_take_off: z.string().uuid(),
  airport_landing: z.string().uuid(),
  flight_date: z.string(),
});

const customerBookingSchema = z.object({
  customer_name: z.string().optional(),
  customer_email: z.string().optional(),
  customer_phone: z.string().optional(),
});

const bookingSchema = z.object({
  flight_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  customer_amount: z
    .number()
    .int()
    .min(1, { message: "At least one customer is required" }),
  customer_list_1: customerBookingSchema,
  customer_list_2: customerBookingSchema.optional(),
  customer_list_3: customerBookingSchema.optional(),
  book_status: z.string().optional(),
  payment_method: z.string().min(1),
  payment_gateway: z
    .string()
    .min(1, { message: "Payment gateway is required" }),
  total_price: z
    .number()
    .positive({ message: "Total price must be a positive number" }),
  travel_status: z.string().optional(),
  seat1: z.string().optional(),
  seat2: z.string().optional(),
  seat3: z.string().optional(),
});

const getUserSchema = z.object({
  user_id: z.string().uuid(),
  user_role: z.string().optional(),
});

const getBookingSchema = z.object({
  user_id: z.string().uuid(),
  book_no: z.string().min(8).max(8),
});

module.exports = {
  userSchema,
  userSignInSchema,
  searchFlightSchema,
  bookingSchema,
  getUserSchema,
  getBookingSchema,
};
