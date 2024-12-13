"use client"

import { useEffect, useState } from "react"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getContactMessages, updateContactMessageStatus, deleteContactMessage } from "@/lib/supabase/contact-messages"

type ContactMessage = {
  id: string
  created_at: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied' | 'archived'
}

const statusColors = {
  unread: "bg-red-500",
  read: "bg-blue-500",
  replied: "bg-green-500",
  archived: "bg-gray-500"
} as const

export function ContactMessagesTable() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function loadMessages() {
    try {
      const data = await getContactMessages()
      setMessages(data)
    } catch (error) {
      toast.error("Failed to load messages")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  async function handleStatusChange(id: string, status: ContactMessage['status']) {
    try {
      await updateContactMessageStatus(id, status)
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ))
      toast.success("Status updated successfully")
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteContactMessage(id)
      setMessages(messages.filter(msg => msg.id !== id))
      toast.success("Message deleted successfully")
    } catch (error) {
      toast.error("Failed to delete message")
    }
  }

  if (isLoading) {
    return <div>Loading messages...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{formatDate(message.created_at)}</TableCell>
              <TableCell>{message.name}</TableCell>
              <TableCell>{message.email}</TableCell>
              <TableCell>{message.subject}</TableCell>
              <TableCell>
                <Badge className={statusColors[message.status]}>
                  {message.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(message.id, 'read')}
                    >
                      Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(message.id, 'replied')}
                    >
                      Mark as Replied
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(message.id, 'archived')}
                    >
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {messages.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No messages found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
} 