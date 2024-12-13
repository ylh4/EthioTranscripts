"use client"

import { createClient } from './client'
import type { Database } from './types'

type DocumentRequest = Database['public']['Tables']['document_requests']['Row']
type UniversityLocation = Database['public']['Tables']['university_locations']['Row']

interface CreateDocumentRequestInput {
  full_name: string
  email: string
  phone: string
  from_university: string
  to_university: string
  to_university_location: {
    country: string
    city: string
    address: string
  }
  document_type: string
  needs_translation?: boolean
  needs_apostille?: boolean
  additional_remarks?: string
}

function generateReferenceNumber(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `ETR-${timestamp}-${randomStr}`
}

export async function createDocumentRequest(data: CreateDocumentRequestInput): Promise<DocumentRequest> {
  const supabase = createClient()
  const referenceNumber = generateReferenceNumber()
  
  try {
    console.log('Creating university location:', data.to_university_location)
    
    // First create the university location
    const { data: location, error: locationError } = await supabase
      .from('university_locations')
      .insert([{
        country: data.to_university_location.country,
        city: data.to_university_location.city,
        address: data.to_university_location.address
      }])
      .select()
      .single()

    if (locationError) {
      console.error('Location creation error:', locationError)
      throw new Error(locationError.message || 'Failed to create university location')
    }

    if (!location) {
      throw new Error('University location was not created')
    }

    console.log('Created university location:', location)
    console.log('Creating document request with reference:', referenceNumber)

    // Then create the document request
    const { data: request, error: requestError } = await supabase
      .from('document_requests')
      .insert([{
        reference_number: referenceNumber,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        from_university: data.from_university,
        to_university: data.to_university,
        to_university_location_id: location.id,
        document_type: data.document_type,
        needs_translation: data.needs_translation ?? false,
        needs_apostille: data.needs_apostille ?? false,
        additional_remarks: data.additional_remarks,
        status: 'pending'
      }])
      .select()
      .single()

    if (requestError) {
      // Cleanup university location if request creation fails
      console.error('Document request error:', requestError)
      await supabase
        .from('university_locations')
        .delete()
        .eq('id', location.id)
      
      throw new Error(requestError.message || 'Failed to create document request')
    }

    if (!request) {
      throw new Error('Document request was not created')
    }

    console.log('Created document request:', request)
    return request
  } catch (error) {
    console.error('Document request error:', error)
    throw error instanceof Error ? error : new Error('An unexpected error occurred')
  }
}

export async function getDocumentRequest(referenceNumber: string): Promise<DocumentRequest & { location: UniversityLocation }> {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('document_requests')
      .select(`
        *,
        location:university_locations!to_university_location_id (
          country,
          city,
          address
        )
      `)
      .eq('reference_number', referenceNumber)
      .single()

    if (error) throw error
    if (!data) throw new Error('Request not found')

    return data
  } catch (error) {
    console.error('Get document request error:', error)
    throw error
  }
}

export async function getAllDocumentRequests(): Promise<(DocumentRequest & { location: UniversityLocation })[]> {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('document_requests')
      .select(`
        *,
        location:university_locations!to_university_location_id (
          id,
          country,
          city,
          address
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Get all document requests error:', error)
    throw error
  }
}

export async function updateDocumentRequestStatus(
  requestId: string,
  status: DocumentRequest['status']
): Promise<void> {
  const supabase = createClient()
  
  try {
    // First check if we're authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError) {
      console.error('Auth error:', authError)
      throw new Error('Authentication error')
    }
    
    if (!session) {
      throw new Error('Not authenticated')
    }

    console.log('Starting status update for request:', { requestId, status })

    // Verify admin status
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (adminError || !adminUser) {
      console.error('Admin verification error:', adminError)
      throw new Error('Not authorized as admin')
    }

    // Perform the update
    const { data: updatedRequest, error: updateError } = await supabase
      .from('document_requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single()

    if (updateError) {
      console.error('Update failed:', updateError)
      throw new Error(updateError.message || 'Failed to update request status')
    }

    if (!updatedRequest) {
      throw new Error('No data returned after update')
    }

    console.log('Status updated successfully:', updatedRequest)
  } catch (error) {
    console.error('Update status error:', error)
    throw error instanceof Error ? error : new Error('An unexpected error occurred')
  }
}