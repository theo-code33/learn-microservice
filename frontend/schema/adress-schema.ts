import z from "zod";

export const addressSchema = z.object({
  wishes: z.enum(["rent", "return"]),
  address: z.string().min(1, { message: "Address is required" }),
})

export type AddressForm = z.infer<typeof addressSchema>;