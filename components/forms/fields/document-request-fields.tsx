"use client"

import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { documentTypes, ethiopianUniversities } from "@/lib/constants"
import type { DocumentRequestFormData } from "../schemas/document-request-schema"
import { UniversityLocationFields } from "./university-location-fields"
import { useEffect } from "react"

interface DocumentRequestFieldsProps {
  form: UseFormReturn<DocumentRequestFormData>
}

export function DocumentRequestFields({ form }: DocumentRequestFieldsProps) {
  const selectedUniversity = form.watch("fromUniversity")
  const isOtherUniversity = selectedUniversity === "other"

  useEffect(() => {
    if (!isOtherUniversity) {
      form.setValue("otherUniversity", "")
    }
  }, [isOtherUniversity, form])

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Document Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Document Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fromUniversity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From University</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select university" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ethiopianUniversities.map((uni) => (
                        <SelectItem key={uni.value} value={uni.value}>
                          {uni.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isOtherUniversity && (
              <FormField
                control={form.control}
                name="otherUniversity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter university name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Destination University */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Destination University</h3>
        <FormField
          control={form.control}
          name="toUniversity.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter destination university name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UniversityLocationFields form={form} />
      </div>

      {/* Additional Services */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Additional Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="needsTranslation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Translation Service</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="needsApostille"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Apostille Service</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Additional Remarks */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Additional Information</h3>
        <FormField
          control={form.control}
          name="additionalRemarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Remarks</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information or special requirements"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}