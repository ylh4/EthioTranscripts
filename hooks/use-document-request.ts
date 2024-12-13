"use client"

import { useState } from 'react'
import { toast } from 'sonner'
import { createDocumentRequest } from '@/lib/supabase/document-requests'
import type { DocumentRequest } from '@/lib/supabase/types'

interface UseDocumentRequestReturn {
  submitRequest: (data: Omit<DocumentRequest, 'id' | 'created_at' | 'status' | 'reference_number'>) => Promise<{
    success: boolean
    referenceNumber?: string
    error?: string
  }>
  isSubmitting: boolean
}

export function useDocumentRequest(): UseDocumentRequestReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitRequest = async (data: Omit<DocumentRequest, 'id' | 'created_at' | 'status' | 'reference_number'>) => {
    setIsSubmitting(true)
    try {
      const newRequest = await createDocumentRequest(data)
      toast.success('Request submitted successfully')
      return {
        success: true,
        referenceNumber: newRequest.reference_number,
      }
    } catch (error) {
      console.error('Request submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request'
      toast.error(errorMessage)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submitRequest,
    isSubmitting,
  }
}