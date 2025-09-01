"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

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

interface RegionsMenuProps {
  className?: string
}

export function RegionsMenu({ className }: RegionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "nav-item h-auto px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[state=open]:bg-accent/50",
            className
          )}
          aria-label="Danh sách quốc gia/region TMDB"
        >
          Quốc gia
          <ChevronDown className="ml-1 h-3 w-3 transition duration-200 data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        side="bottom" 
        align="start"
        className="w-56"
        aria-label="Danh sách quốc gia"
      >
        <ScrollArea className="h-[420px]">
          <div className="p-1">
            {regions.map((region) => (
              <DropdownMenuItem key={region.code} asChild>
                <Link
                  href={`/discover?region=${region.code}`}
                  className="w-full cursor-pointer px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  {region.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}