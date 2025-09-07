'use client';

import Link from 'next/link';

interface Category {
  name: string;
  href: string;
  color: string;
  textColor?: string;
}

const categories: Category[] = [
  {
    name: 'Hành Động',
    href: '/chu-de/hanh-dong',
    color: 'bg-red-600',
    textColor: 'text-white'
  },
  {
    name: 'Phiêu Lưu', 
    href: '/chu-de/phieu-luu',
    color: 'bg-green-600',
    textColor: 'text-white'
  },
  {
    name: 'Hoạt Hình',
    href: '/chu-de/hoat-hinh',
    color: 'bg-blue-600',
    textColor: 'text-white'
  },
  {
    name: 'Hài Hước',
    href: '/chu-de/hai-huoc',
    color: 'bg-yellow-500',
    textColor: 'text-white'
  },
  {
    name: 'Tội Phạm',
    href: '/chu-de/toi-pham',
    color: 'bg-purple-600',
    textColor: 'text-white'
  },
  {
    name: 'Tài Liệu',
    href: '/chu-de/tai-lieu',
    color: 'bg-gray-600',
    textColor: 'text-white'
  },
  {
    name: 'Chính Kịch',
    href: '/chu-de/chinh-kich',
    color: 'bg-pink-600',
    textColor: 'text-white'
  },
  {
    name: 'Gia Đình',
    href: '/chu-de/gia-dinh',
    color: 'bg-orange-500',
    textColor: 'text-white'
  },
  {
    name: 'Kinh Dị',
    href: '/chu-de/kinh-di',
    color: 'bg-red-800',
    textColor: 'text-white'
  },
  {
    name: 'Lãng Mạn',
    href: '/chu-de/lang-man',
    color: 'bg-pink-400',
    textColor: 'text-white'
  },
  {
    name: 'Khoa Học Viễn Tưởng',
    href: '/chu-de/khoa-hoc-vien-tuong',
    color: 'bg-indigo-600',
    textColor: 'text-white'
  },
  {
    name: 'Chiến Tranh',
    href: '/chu-de/chien-tranh',
    color: 'bg-stone-700',
    textColor: 'text-white'
  },
  {
    name: 'Bí Ẩn',
    href: '/chu-de/bi-an',
    color: 'bg-emerald-700',
    textColor: 'text-white'
  },
  {
    name: 'Âm Nhạc',
    href: '/chu-de/am-nhac',
    color: 'bg-violet-500',
    textColor: 'text-white'
  },
  {
    name: 'Lịch Sử',
    href: '/chu-de/lich-su',
    color: 'bg-amber-700',
    textColor: 'text-white'
  },
  {
    name: 'Phim Truyền Hình',
    href: '/chu-de/phim-truyen-hinh',
    color: 'bg-cyan-600',
    textColor: 'text-white'
  },
  {
    name: 'Phim Phương Tây',
    href: '/chu-de/phim-phuong-tay',
    color: 'bg-orange-700',
    textColor: 'text-white'
  },
];

interface CategoriesProps {
  showAll?: boolean;
}

export function Categories({ showAll = true }: CategoriesProps) {
  return (
    <section className="py-8 px-4">
      <div className=" mx-auto px-4 w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Bạn đang quan tâm gì?</h2>
        <div className="flex flex-wrap gap-4 w-full">
          {categories
            .slice(0, showAll ? categories.length : 6)
            .map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className={`
                  ${category.color} ${category.textColor}
                  px-6 py-4 rounded-lg
                  flex-1 hover:opacity-90 transition-opacity
                  flex flex-col justify-between
                  min-w-[140px] min-h-[100px]
                  group
                `}
              >
                <span className="font-semibold text-base">{category.name}</span>
                <span className="text-xs opacity-80 mt-2 group-hover:opacity-100 transition-opacity">
                  Xem chi tiết {">"}
                </span>
              </Link>
            ))}
          {!showAll && (
            <Link
              href="/chu-de"
              className={`
                bg-gray-500 text-white
                px-6 py-4 rounded-lg
                flex-1 hover:opacity-90 transition-opacity
                flex flex-col justify-between
                min-w-[140px] min-h-[100px]
                group
              `}
            >
              <span className="font-semibold text-base">Xem thêm</span>
              <span className="text-xs opacity-80 mt-2 group-hover:opacity-100 transition-opacity">
                Tất cả chủ đề {">"}
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}