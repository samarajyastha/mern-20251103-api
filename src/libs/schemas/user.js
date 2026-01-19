import z from "zod";

import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "../../constants/roles.js";

const addressSchema = z.object({
  city: z.string({ error: "Address city is required." }),
  province: z.string({ error: "Address province is required." }),
  street: z.string().optional(),
  country: z.string().optional(),
});

const userSchema = z.object({
  name: z.string({ error: "Name is required." }).trim(),
  email: z.email({ error: "Email is required." }),
  password: z.string({ error: "Password is required." }).min(6),
  phone: z.string({ error: "Phone number is required." }).min(6).max(13),
  address: addressSchema.optional(),
  roles: z.array(z.enum([ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER])).optional(),
  profileImageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
});

const updateRolesSchema = z.object({
  roles: z.array(z.enum([ROLE_MERCHANT, ROLE_USER])),
});

export { userSchema, updateRolesSchema };
