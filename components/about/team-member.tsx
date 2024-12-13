"use client"

import Image from "next/image"
import { useState } from "react"

interface TeamMemberProps {
  name: string
  title: string
  description: string
  imagePath: string
}

export function TeamMember({ name, title, description, imagePath }: TeamMemberProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/3">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          {!imageError ? (
            <Image
              src={imagePath}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={() => {
                console.error(`Failed to load image: ${imagePath}`)
                setImageError(true)
              }}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <p className="text-sm text-muted-foreground">Image not found</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-lg text-muted-foreground mb-4">{title}</p>
        <div className="prose prose-green max-w-none">
          <p className="text-muted-foreground whitespace-pre-wrap">{description}</p>
        </div>
      </div>
    </div>
  )
} 