import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
  barcode: z.string().optional(),
  photo: z
    .string({
      message: "Photo must be a valid URL",
    })
    .optional(),
  quantity: z.coerce.number().min(1, "Quantity is required"),
  purchasePrice: z.coerce.number().min(0.01, "Purchase Price is required"),
  sellingPrice: z.coerce.number().min(0.01, "Selling Price is required"),
  productType: z.enum(
    [
      "Physical Goods",
      "Digital Products",
      "Services",
      "Experiential Products",
      "Luxury Products",
      "Raw Materials",
    ],
    {
      errorMap: () => ({ message: "Product Type is required" }),
    }
  ),
  dealer: z.string().min(1, "Dealer is required"),
  discount: z.coerce.number().min(0).optional(),
  paymentMethod: z.enum(["Cash", "bKash", "Nagad", "Upay", "Bank Payment"], {
    errorMap: () => ({ message: "Payment Method is required" }),
  }),
  cashPayment: z.coerce.number().min(0, "Cash Payment is required"),
  additionalCosts: z.coerce.number().optional(),
  notes: z.string().min(1, "Notes are required"),
});
