"use client"

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Region {
  code: string
  label: string
}

const regions: Region[] = [
  { code: "GB", label: "Anh" },
  { code: "CA", label: "Canada" },
  { code: "KR", label: "Hàn Quốc" },
  { code: "HK", label: "Hồng Kông" },
  { code: "US", label: "Mỹ" },
  { code: "JP", label: "Nhật Bản" },
  { code: "FR", label: "Pháp" },
  { code: "TH", label: "Thái Lan" },
  { code: "CN", label: "Trung Quốc" },
  { code: "AU", label: "Úc" },
  { code: "TW", label: "Đài Loan" },
  { code: "DE", label: "Đức" },
]

interface MobileRegionsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileRegionsSheet({ open, onOpenChange }: MobileRegionsSheetProps) {
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
              Quốc gia
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
            <div className="space-y-1 py-4">
              {regions.map((region) => (
                <Button
                  key={region.code}
                  variant="ghost"
                  className="h-auto w-full justify-start p-3 text-left hover:bg-accent hover:text-accent-foreground"
                  asChild
                >
                  <Link
                    href={`/discover?region=${region.code}`}
                    onClick={handleLinkClick}
                    className="block w-full"
                  >
                    <div className="text-sm font-medium">{region.label}</div>
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