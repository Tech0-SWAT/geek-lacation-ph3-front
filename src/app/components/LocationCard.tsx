import Image from 'next/image'
import { useState } from 'react'
import { FaBuilding, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

type ImageType = {
  url: string
  type: string
  caption?: string | null
}

type LocationCardProps = {
  name: string
  address: string
  tel?: string
  mail?: string
  categories: string[]
  images?: ImageType[]
}

export default function LocationCard({
  name = '',
  address = '',
  tel,
  mail,
  categories = [],
  images = [],
}: LocationCardProps) {
  const[mainIndex, setMainIndex] = useState(0)
  // console.log("🎯 LocationCard images:", images)
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-[360px] overflow-hidden">

      {/* メイン画像 */}
      <div className="w-full aspect-[16/9] relative overflow-hidden">
      
        <Image
          src={images[mainIndex]?.url || '/no-image.png'}
          alt={images[mainIndex]?.caption || 'main image'}
          fill
          className="object-cover"
        />
      </div>

      {/* サムネイル群 */}
      <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide">
        {images.slice(0, 10).map((img, i) => (
          <div
            key={i}
            className={`relative w-16 h-10 flex-shrink-0 overflow-hidden cursor-pointer `}
            onClick={() => setMainIndex(i)}
          >
            <Image
              src={img.url}
              alt={img.caption || `thumb-${i}`}
              fill
              className={`object-cover transition-opacity duration-200 ${
                i !== mainIndex ? 'opacity-40' : ''
              }`}
            />
          </div>
        ))}
      </div>

      {/* タイトル */}
      <h2 className="mt-4 font-bold text-lg leading-snug min-h-[3rem] line-clamp-2">{name}</h2>

      {/* カテゴリ */}
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((cat, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm border border-gray-400 rounded-full text-gray-700"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* 情報 */}
      <div className="mt-4 text-sm text-gray-800 space-y-2 pl-4 pr-4 pb-4">
        <div className="flex items-center gap-2">
          <FaBuilding className="text-lg text-black" />
          <span>{address}</span>
        </div>
        {tel && (
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-lg text-black" />
            <span>{tel}</span>
          </div>
        )}
        {mail && (
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-lg text-black" />
            <span>{mail}</span>
          </div>
        )}
      </div>
    </div>
  )
}