import Link from "next/link"

interface LogoProps {
  className?: string
  showTagline?: boolean
}

export function Logo({ className = "", showTagline = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`} aria-label="Về trang chủ">
      <img src="/icon.png" alt="Logo" className="h-12 w-12 rounded" />
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-tight text-foreground">Movia</span>
        {showTagline && (
          <span className="text-xs text-muted-foreground hidden sm:block">Xem phim chất lượng</span>
        )}
      </div>
    </Link>
  )
}