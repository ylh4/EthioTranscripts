"use client"

import { createClient } from './client'
import type { Database } from './types'

type ContactMessage = Database['public']['Tables']['contact_messages']['Row']

interface CreateContactMessageInput {
  name: string
  email: string
  subject: string
  message: string
}

export async function createContactMessage(data: CreateContactMessageInput) {
  const supabase = createClient()

  try {
    const { data: result, error } = await supabase
      .rpc('submit_contact_message', {
        name_input: data.name,
        email_input: data.email,
        subject_input: data.subject,
        message_input: data.message
      })

    if (error) {
      console.error('Supabase error creating contact message:', error)
      throw new Error(error.message || 'Failed to send message')
    }

    return { id: result }
  } catch (error) {
    console.error('Error in createContactMessage:', error)
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export async function getContactMessages() {
  const supabase = createClient()

  try {
    const { data: messages, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching contact messages:', error)
      throw new Error(error.message || 'Failed to fetch messages')
    }

    return messages || []
  } catch (error) {
    console.error('Error in getContactMessages:', error)
    throw new Error('Failed to fetch messages')
  }
}

export async function updateContactMessageStatus(id: string, status: ContactMessage['status']) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)

    if (error) {
      console.error('Error updating contact message:', error)
      throw new Error(error.message || 'Failed to update message status')
    }
  } catch (error) {
    console.error('Error in updateContactMessageStatus:', error)
    throw new Error('Failed to update message status')
  }
}

export async function deleteContactMessage(id: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting contact message:', error)
      throw new Error(error.message || 'Failed to delete message')
    }
  } catch (error) {
    console.error('Error in deleteContactMessage:', error)
    throw new Error('Failed to delete message')
  }
} 