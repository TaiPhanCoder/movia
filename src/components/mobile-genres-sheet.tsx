"use client"

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Genre {
  id: number
  name: string
}

const genres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
]

interface MobileGenresSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileGenresSheet({ open, onOpenChange }: MobileGenresSheetProps) {
  const handleLinkClick = () => {
    onOpenChange(false)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <DialogPrimitive.Title className="text-lg font-semibold">
              Thể loại
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
                <span className="sr-only">Đóng</span>
              </Button>
            </DialogPrimitive.Close>
          </div>
          
          <Separator />
          
          {/* Content */}
          <ScrollArea className="max-h-[60vh] px-4">
            <div className="grid grid-cols-2 gap-2 py-4">
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  variant="ghost"
                  className="h-auto justify-start p-3 text-left hover:bg-accent hover:text-accent-foreground"
                  asChild
                >
                  <Link
                    href={`/discover?with_genres=${genre.id}`}
                    onClick={handleLinkClick}
                    className="block w-full"
                  >
                    <div className="text-sm font-medium">{genre.name}</div>
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}