import { Button } from "@/components/ui/button"
import { MapPin, Star, ArrowRight, Camera, Clock, Thermometer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const chicagoImages = [
  {
    id: 1,
    src: "https://i.imgur.com/3kCmaYp.jpg/",
    alt: "Chicago Skyline",
    title: "ICONIC_SKYLINE",
    description: "MAGNIFICENT_MILE_VIEWS",
    height: 300,
    width: 400,
  },
  {
    id: 2,
    src: "https://i.imgur.com/zmrbOjc.jpg/",
    alt: "The World Famous El",
    title: "THE_WORLD_FAMOUS_EL",
    description: "NOT_TO_BE_MISSED",
    height: 300,
    width: 400,
  },
  {
    id: 3,
    src: "https://i.imgur.com/2oHJfij.jpg/",
    alt: "Home of the Goat",
    title: "HOME_OF_THE_GOAT",
    description: "REPEAT_THE_THREEPEAT",
    height: 300,
    width: 400,
  },
  {
    id: 4,
    src: "https://i.imgur.com/Hpq2kE9.jpg/",
    alt: "Chicago Fire Department",
    title: "CHICAGO_FIRE_DEPARTMENT",
    description: "CHICAGO_FIRE_DEPARTMENT",
    height: 300,
    width: 400,
  },
  {
    id: 5,
    src: "https://i.imgur.com/ypo4Iry.jpg/",
    alt: "The Bean",
    title: "THE_BEAN",
    description: "THE_BEAN",
    height: 300,
    width: 400,
  },
  {
    id: 6,
    src: "https://i.imgur.com/Sy5YNW7.jpg/",
    alt: "The Hancock Tower",
    title: "THE_HANCOCK_TOWER",
    description: "THE_HANCOCK_TOWER",
    height: 300,
    width: 400,
  },
  {
    id: 7,
    src: "https://i.imgur.com/cTPmiQg.jpg/",
    alt: "Chicago at Night",
    title: "CHICAGO_AT_NIGHT",
    description: "CHICAGO_AT_NIGHT",
    height: 300,
    width: 400,
  },
  {
    id: 8,
    src: "https://i.imgur.com/by9SBer.jpg/",
    alt: "Chicago from the lakefront",
    title: "CHICAGO_FROM_THE_LAKEFRONT",
    description: "CHICAGO_FROM_THE_LAKEFRONT",
    height: 300,
    width: 400,
  },
  {
    id: 9,
    src: "https://i.imgur.com/kfR6kjp.jpg/",
    alt: "Millennium Park",
    title: "MILLENNIUM_PARK",
    description: "MILLENNIUM_PARK",
    height: 300,
    width: 400,
  },
]

interface InteractiveAdServerProps {
  searchParams?: { image?: string }
}

export function InteractiveAdServer({ searchParams }: InteractiveAdServerProps = {}) {
  const activeImage = searchParams?.image ? Number.parseInt(searchParams.image) : 0
  const validActiveImage = activeImage >= 0 && activeImage < chicagoImages.length ? activeImage : 0

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
            <div className="relative overflow-hidden border border-blue-700/30 group cursor-pointer hover-container">
              <img
                src={chicagoImages[validActiveImage].src || "/placeholder.svg"}
                alt={chicagoImages[validActiveImage].alt}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Image Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm border border-blue-700/30 rounded-lg p-4">
                  <h4 className="text-white font-bold tracking-wider text-lg mb-1">
                    {chicagoImages[validActiveImage].title}
                  </h4>
                  <p className="text-blue-200 text-sm tracking-wide">{chicagoImages[validActiveImage].description}</p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Image Counter */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {chicagoImages.map((_, index) => (
                <Link
                  key={index}
                  href={`?image=${index}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 block ${
                    index === validActiveImage ? "bg-blue-400 w-8" : "bg-blue-700/50 hover:bg-blue-600/70"
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
                <Link
                  key={image.id}
                  href={`?image=${index}`}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 block ${
                    index === validActiveImage
                      ? "border-blue-400 scale-105"
                      : "border-blue-700/30 hover:border-blue-600/50"
                  }`}
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === validActiveImage ? "bg-blue-400/20" : "bg-black/20 hover:bg-black/10"
                    }`}
                  ></div>
                </Link>
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
