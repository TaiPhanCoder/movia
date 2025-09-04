"use client"

import * as React from "react"
import Link from "next/link"
import { X, ChevronRight, CirclePlay } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MobileGenresSheet } from "@/components/mobile-genres-sheet"
import { MobileRegionsSheet } from "@/components/mobile-regions-sheet"

interface NavItem {
  label: string
  href: string
  suffixIcon?: React.ComponentType<{ className?: string }>
}

interface UserMenuItem {
  label: string
  href: string
  danger?: boolean
  separator?: boolean
}

interface MobileDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  navItems: NavItem[]
  userMenuItems: UserMenuItem[]
}

export function MobileDrawer({ open, onOpenChange, navItems, userMenuItems }: MobileDrawerProps) {
  const [genresSheetOpen, setGenresSheetOpen] = React.useState(false)
  const [regionsSheetOpen, setRegionsSheetOpen] = React.useState(false)
  
  const handleLinkClick = () => {
    onOpenChange(false)
  }
  
  const handleGenresClick = () => {
    setGenresSheetOpen(true)
  }
  
  const handleRegionsClick = () => {
    setRegionsSheetOpen(true)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-50 h-full w-3/4 border-l bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b">
              <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500">
                  <CirclePlay className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight text-foreground">RoPhim</span>
                  <span className="text-xs text-muted-foreground">Phim hay cá rô</span>
                </div>
              </Link>
              <DialogPrimitive.Close asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Đóng menu</span>
                </Button>
              </DialogPrimitive.Close>
            </div>

            {/* User Profile Section */}
            <div className="py-4 border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Người dùng</span>
                  <span className="text-xs text-muted-foreground">user@example.com</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4" aria-label="Điều hướng di động">
              <div className="space-y-1">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Danh mục
                </div>
                
                {/* Genres Button */}
                <button
                  onClick={handleGenresClick}
                  className="flex w-full items-center justify-between px-2 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                >
                  <span>Thể loại</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                
                {navItems.map((item) => {
                  const Icon = item.suffixIcon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between px-2 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                    >
                      <span>{item.label}</span>
                      {Icon ? (
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Link>
                  )
                })}
                
                {/* Regions Button */}
                <button
                  onClick={handleRegionsClick}
                  className="flex w-full items-center justify-between px-2 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                >
                  <span>Quốc gia</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* User Menu Items */}
              <div className="mt-6 space-y-1">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tài khoản
                </div>
                {userMenuItems.map((item, index) => {
                  if (item.separator) {
                    return <div key={index} className="my-2 border-t" />
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center justify-between px-2 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                        item.danger && "text-destructive hover:text-destructive"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center">
                © 2024 RoPhim. Phim hay cá rô.
              </p>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
      
      {/* Mobile Sheets */}
      <MobileGenresSheet open={genresSheetOpen} onOpenChange={setGenresSheetOpen} />
      <MobileRegionsSheet open={regionsSheetOpen} onOpenChange={setRegionsSheetOpen} />
    </DialogPrimitive.Root>
  )
}