"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Menu, ChevronDown, CirclePlay } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileDrawer } from "@/components/mobile-drawer"
import { SearchDialog } from "@/components/search-dialog"
import { GenresMenu } from "@/components/genres-menu"
import { RegionsMenu } from "@/components/regions-menu"

interface NavItem {
  label: string
  href: string
  suffixIcon?: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: "Phim Lẻ", href: "/phim-le" },
  { label: "Phim Bộ", href: "/phim-bo" },
  { label: "Diễn Viên", href: "/dien-vien" },
]

const userMenuItems = [
  { label: "Trang cá nhân", href: "/me" },
  { label: "Cài đặt", href: "/settings" },
  { separator: true },
  { label: "Đăng xuất", href: "/logout", danger: true },
]

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchValue)
    }
  }

  const handleSearchChange = React.useMemo(
    () => {
      let timeoutId: NodeJS.Timeout
      return (value: string) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          setSearchValue(value)
          // Debounced search logic here
        }, 300)
      }
    },
    []
  )

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 w-screen border-b border-border/40 bg-background/95 header-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 w-screen items-center justify-between px-24 gap-3">
          <Link href="/" className="flex items-center space-x-2" aria-label="Về trang chủ">
            <img src="/icon.png" alt="Logo" className="h-12 w-12 rounded" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-foreground">Movia</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Xem phim chất lượng</span>
            </div>
          </Link>

          {/* Desktop Search & Navigation */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm phim, diễn viên"
                className="w-full rounded-full bg-muted/50 pl-10 pr-4 focus:bg-background"
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Tìm kiếm"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Điều hướng chính">
            <GenresMenu />
            {navItems.map((item) => {
              const Icon = item.suffixIcon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-item flex items-center"
                >
                  {item.label}
                  {Icon && <Icon className="ml-1 h-3 w-3" />}
                </Link>
              )
            })}
            <RegionsMenu />
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/user.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="absolute -bottom-1 -right-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Người dùng</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item, index) => {
                  if (item.separator) {
                    return <DropdownMenuSeparator key={index} />
                  }
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href as string}
                        className={cn(
                          "w-full",
                          item.danger && "text-destructive focus:text-destructive"
                        )}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Mở tìm kiếm"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Mở menu"
              aria-controls="mobile-drawer"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        navItems={navItems}
        userMenuItems={userMenuItems}
      />
    </>
  )
}