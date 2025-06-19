"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Images, Zap, Clock, Gauge } from "lucide-react"

interface CityImage {
  url: string
  pathname: string
  size: number
}

interface ImageShowcaseProps {
  citySlug: string
  cityName: string
  images: CityImage[]
}

export function ImageShowcase({ citySlug, cityName, images }: ImageShowcaseProps) {
  const [loadedImages, setLoadedImages] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (images.length > 0 && !startTime) {
      setStartTime(Date.now())
    }
  }, [images, startTime])

  const handleImageLoad = () => {
    const newCount = loadedImages + 1
    setLoadedImages(newCount)

    if (newCount === images.length && startTime && !loadTime) {
      setLoadTime(Date.now() - startTime)
    }
  }

  const displayImages = showAll ? images : images.slice(0, 12)
  const totalSize = images.reduce((sum, img) => sum + img.size, 0)
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2)

  return (
    <div className="bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-blue-900/10 border border-purple-500/20 rounded-3xl p-8 mb-12 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Images className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl tracking-wider text-white font-bold">NEXT_IMAGE_SHOWCASE</h2>
            <p className="text-sm text-zinc-400 tracking-wider">{cityName.toUpperCase()} • TEST_COHORT_FEATURE</p>
          </div>
        </div>

        <div className="bg-purple-500/20 border border-purple-500/40 rounded-xl p-4 text-center">
          <div className="text-xs text-purple-300 tracking-widest mb-1">PERFORMANCE</div>
          <div className="text-lg font-bold text-white tracking-wider">{loadTime ? `${loadTime}MS` : "LOADING..."}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Images className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-zinc-400 tracking-widest">TOTAL_IMAGES</span>
          </div>
          <div className="text-xl font-bold text-white tracking-wider">{images.length}</div>
        </div>

        <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gauge className="h-4 w-4 text-green-400" />
            <span className="text-xs text-zinc-400 tracking-widest">LOADED</span>
          </div>
          <div className="text-xl font-bold text-white tracking-wider">
            {loadedImages}/{images.length}
          </div>
        </div>

        <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-zinc-400 tracking-widest">TOTAL_SIZE</span>
          </div>
          <div className="text-xl font-bold text-white tracking-wider">{totalSizeMB}MB</div>
        </div>

        <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-purple-400" />
            <span className="text-xs text-zinc-400 tracking-widest">LOAD_TIME</span>
          </div>
          <div className="text-xl font-bold text-white tracking-wider">{loadTime ? `${loadTime}MS` : "..."}</div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {displayImages.map((image, index) => (
          <div
            key={image.pathname}
            className="relative aspect-square bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800 group hover:border-purple-500/50 transition-colors"
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={`${cityName} image ${index + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onLoad={handleImageLoad}
              priority={index < 8} // Prioritize first 8 images
            />

            {/* Image info overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-xs text-white font-mono tracking-wider truncate">
                  {image.pathname.split("/").pop()}
                </div>
                <div className="text-xs text-zinc-300 tracking-wider">{(image.size / 1024).toFixed(0)}KB</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {images.length > 12 && (
        <div className="text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-white tracking-wider"
          >
            {showAll ? "SHOW_LESS" : `SHOW_ALL_${images.length}_IMAGES`}
          </Button>
        </div>
      )}

      {/* Next.js Image Features Demo */}
      <div className="mt-8 pt-8 border-t border-purple-500/20">
        <h3 className="text-lg font-bold tracking-wider mb-4 text-white">NEXT_IMAGE_FEATURES_DEMONSTRATED</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-black/20 border border-zinc-800 rounded-lg p-4">
            <div className="text-purple-400 font-bold tracking-wider mb-2">AUTOMATIC_OPTIMIZATION</div>
            <ul className="text-zinc-300 space-y-1 tracking-wide">
              <li>• WebP/AVIF format conversion</li>
              <li>• Responsive image sizing</li>
              <li>• Quality optimization</li>
            </ul>
          </div>
          <div className="bg-black/20 border border-zinc-800 rounded-lg p-4">
            <div className="text-purple-400 font-bold tracking-wider mb-2">PERFORMANCE_FEATURES</div>
            <ul className="text-zinc-300 space-y-1 tracking-wide">
              <li>• Lazy loading by default</li>
              <li>• Priority loading for above-fold</li>
              <li>• Blur placeholder support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
