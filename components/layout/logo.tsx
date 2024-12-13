import Link from "next/link"
import { GraduationCap } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
      <GraduationCap className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold">EthioTranscripts</span>
    </Link>
  )
}