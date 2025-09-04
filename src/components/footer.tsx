'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo showTagline={false} className="text-white" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Xem phim chất lượng cao
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hỗi Đáp</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Câu hỏi</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Thể Loại</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Dongphim</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Giangphim</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Motphim</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Subnhanh</Link></li>
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quốc Gia</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Việt Nam</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Hàn Quốc</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Trung Quốc</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Thái Lan</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                Xem phim online miễn phí chất lượng cao với phụ đề tiếng việt - thuyết minh. Đặc biệt là phim bộ HD, phim 
                phim mới hàng ngày. Xem phim nhanh online chất lượng HD. phim bo, phim le, hoat hinh, phim 18+ vietsub 
                Hàn Quốc, Trung Quốc, Thái Lan
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Nhà Bán Âm Mỹ - Bộ phim truyền hình dài tập được phát sóng trên kênh tvN từ ngày 4 tháng 9 năm 2025 chủ đề lương đô.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">© 2025 Movia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}