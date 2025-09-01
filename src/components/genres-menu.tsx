"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Genre {
  id: number
  name: string
}

const genres: Genre[] = [
  { id: 28, name: "Hành Động" },
  { id: 12, name: "Phiêu Lưu" },
  { id: 16, name: "Hoạt Hình" },
  { id: 35, name: "Hài Hước" },
  { id: 80, name: "Tội Phạm" },
  { id: 99, name: "Tài Liệu" },
  { id: 18, name: "Chính Kịch" },
  { id: 10751, name: "Gia Đình" },
  { id: 14, name: "Giả Tưởng" },
  { id: 36, name: "Lịch Sử" },
  { id: 27, name: "Kinh Dị" },
  { id: 10402, name: "Âm Nhạc" },
  { id: 9648, name: "Bí Ẩn" },
  { id: 10749, name: "Lãng Mạn" },
  { id: 878, name: "Khoa Học Viễn Tưởng" },
  { id: 10770, name: "Phim Truyền Hình" },
  { id: 53, name: "Giật Gân" },
  { id: 10752, name: "Chiến Tranh" },
  { id: 37, name: "Viễn Tây" },
]
interface GenresMenuProps {
  className?: string
}

export function GenresMenu({ className }: GenresMenuProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="nav-item h-auto px-3 py-2 text-sm font-medium transition-colors hover:bg-transparent hover:text-foreground bg-transparent"
            aria-label="Danh sách thể loại TMDB"
          >
            Thể loại
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-6 left-1/2 -translate-x-1/2">
            <div 
              className="grid gap-4 md:w-[880px] md:grid-cols-4"
              role="grid"
              aria-label="Danh sách thể loại phim"
            >
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  variant="ghost"
                  className="h-auto justify-start p-3 text-left hover:text-accent-foreground focus:text-accent-foreground"
                  asChild
                >
                  <Link
                    href={`/discover?with_genres=${genre.id}`}
                    className="block w-full"
                    role="gridcell"
                  >
                    <div className="text-sm font-medium">{genre.name}</div>
                  </Link>
                </Button>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}