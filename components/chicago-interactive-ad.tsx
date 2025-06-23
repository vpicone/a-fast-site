"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Star, ArrowRight, Camera, Clock, Thermometer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const chicagoImages = [
  {
    id: 1,
    // src: "/0.jpg?height=300&width=400&text=Chicago+Skyline",
    src: "/0.jpg",
    alt: "Chicago Skyline",
    title: "ICONIC_SKYLINE",
    description: "MAGNIFICENT_MILE_VIEWS",
  },
  {
    id: 2,
    src: "/2.jpg",
    // src: "/2.jpg?height=300&width=400&text=Millennium+Park",
    alt: "Millennium Park",
    title: "MILLENNIUM_PARK",
    description: "CLOUD_GATE_SCULPTURE",
  },
  {
    id: 3,
    src: "/3.jpg",
    // src: "/3.jpg?height=300&width=400&text=Navy+Pier",
    alt: "Navy Pier",
    title: "NAVY_PIER",
    description: "LAKEFRONT_ENTERTAINMENT",
  },
  {
    id: 4,
    src: "/4.jpg",
    // src: "/4.jpg?height=300&width=400&text=Chicago+Architecture",
    alt: "Chicago Architecture",
    title: "ARCHITECTURE_TOUR",
    description: "WORLD_CLASS_BUILDINGS",
  },
  {
    id: 5,
    src: "/5.jpg",
    // src: "/5.jpg?height=300&width=400&text=Deep+Dish+Pizza",
    alt: "Deep Dish Pizza",
    title: "DEEP_DISH_PIZZA",
    description: "AUTHENTIC_CHICAGO_STYLE",
  },
  {
    id: 6,
    src: "/6.jpg",
    // src: "/6.jpg?height=300&width=400&text=Wrigley+Field",
    alt: "Wrigley Field",
    title: "WRIGLEY_FIELD",
    description: "HISTORIC_BASEBALL_STADIUM",
  },
  {
    id: 7,
    src: "/7.jpg",
    // src: "/7.jpg?height=300&width=400&text=Chicago+Architecture",
    alt: "Chicago Architecture",
    title: "ARCHITECTURE_TOUR",
    description: "WORLD_CLASS_BUILDINGS",
  },
  {
    id: 8,
    src: "/8.jpg",
    // src: "/8.jpg?height=300&width=400&text=Deep+Dish+Pizza",
    alt: "Deep Dish Pizza",
    title: "DEEP_DISH_PIZZA",
    description: "AUTHENTIC_CHICAGO_STYLE",
  },
  {
    id: 9,
    src: "/9.jpg",
    // src: "/9.jpg?height=300&width=400&text=Wrigley+Field",
    alt: "Wrigley Field",
    title: "WRIGLEY_FIELD",
    description: "HISTORIC_BASEBALL_STADIUM",
  },
]

export function ChicagoInteractiveAd() {
  const [activeImage, setActiveImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-blue-900/20 border border-blue-800/30 rounded-2xl p-8 mb-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/50 rounded-full px-4 py-2 mb-4">
            <MapPin className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300 tracking-wider font-bold">FEATURED_DESTINATION</span>
          </div>

          <h3 className="text-4xl font-bold text-white mb-2 tracking-wider">
            DISCOVER_<span className="text-blue-400">CHICAGO</span>
          </h3>
          <p className="text-blue-200 tracking-wide max-w-2xl mx-auto">
            THE WINDY CITY AWAITS • ARCHITECTURE • CULTURE • DEEP DISH • LAKEFRONT
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Main Image Display */}
          <div className="relative">
            <div
              className="relative overflow-hidden border border-blue-700/30 group cursor-pointer"
              // className="relative aspect-[4/3] rounded-xl overflow-hidden border border-blue-700/30 group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                // src={chicagoImages[activeImage].src || "/placeholder.svg"}
                src={chicagoImages[activeImage].src || "/placeholder.svg"}
                alt={chicagoImages[activeImage].alt}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Image Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm border border-blue-700/30 rounded-lg p-4">
                  <h4 className="text-white font-bold tracking-wider text-lg mb-1">
                    {chicagoImages[activeImage].title}
                  </h4>
                  <p className="text-blue-200 text-sm tracking-wide">{chicagoImages[activeImage].description}</p>
                </div>
              </div>

              {/* Hover Overlay */}
              {isHovered && (
                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Image Counter */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {chicagoImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeImage ? "bg-blue-400 w-8" : "bg-blue-700/50 hover:bg-blue-600/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content & Thumbnails */}
          <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg p-3 text-center">
                <Star className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white tracking-wider">4.8</div>
                <div className="text-xs text-blue-300 tracking-wider">RATING</div>
              </div>
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg p-3 text-center">
                <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white tracking-wider">3D</div>
                <div className="text-xs text-blue-300 tracking-wider">MIN_STAY</div>
              </div>
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg p-3 text-center">
                <Thermometer className="h-5 w-5 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white tracking-wider">22°C</div>
                <div className="text-xs text-blue-300 tracking-wider">AVG_TEMP</div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {chicagoImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === activeImage ? "border-blue-400 scale-105" : "border-blue-700/30 hover:border-blue-600/50"
                  }`}
                >
                  <img src={image.src || "/placeholder.svg"} alt={image.alt} className="object-cover" />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === activeImage ? "bg-blue-400/20" : "bg-black/20 hover:bg-black/10"
                    }`}
                  ></div>
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link href="/experience/chicago">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 group tracking-wider"
              >
                <MapPin className="mr-3 h-5 w-5" />
                EXPLORE_CHICAGO_NOW
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <p className="text-center text-xs text-blue-400 mt-3 tracking-wider">
              CLICK_TO_VIEW_LIVE_ISS_DISTANCE_FROM_CHICAGO
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
