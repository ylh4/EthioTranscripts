import * as z from "zod"
import { documentTypes, ethiopianUniversities } from "@/lib/constants"

export const documentRequestSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  fromUniversity: z.string().min(1, "Please select your university"),
  otherUniversity: z.string().optional(),
  toUniversity: z.string().min(2, "University name is required"),
  toUniversityLocation: z.object({
    country: z.string().min(1, "Please select a country"),
    otherCountry: z.string().optional(),
    city: z.string().min(2, "City is required"),
    address: z.string().min(5, "Address is required"),
  }),
  documentType: z.string().min(1, "Please select document type"),
  additionalRemarks: z.string().optional(),
  needsTranslation: z.boolean().default(false),
  needsApostille: z.boolean().default(false),
}).refine((data) => {
  if (data.fromUniversity === "other") {
    return data.otherUniversity && data.otherUniversity.length >= 2
  }
  return true
}, {
  message: "Please specify the university name",
  path: ["otherUniversity"],
}).refine((data) => {
  if (data.toUniversityLocation.country === "other") {
    return data.toUniversityLocation.otherCountry && data.toUniversityLocation.otherCountry.length >= 2
  }
  return true
}, {
  message: "Please specify the country name",
  path: ["toUniversityLocation.otherCountry"],
})

export type DocumentRequestFormData = z.infer<typeof documentRequestSchema>