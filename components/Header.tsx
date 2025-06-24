import { RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { MAJOR_CITIES } from "@/lib/cities"

export default function Header() {
    function randomCity() {
      return MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)]
    }
    return (
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white"><Link href="/">CITY_EXPLORER</Link></h1>
                <p className="text-xs text-zinc-400 tracking-wider">+ WEATHER_SATTELLITE_DATA</p>
              </div>
            </div>        
            <div className="text-xs text-zinc-500 tracking-widest">VERCEL_SHIP_2025</div>
            <Link href={`/experience/${randomCity().slug}`}>
              <Button
                variant="outline"
                className="tracking-wider bg-black text-white border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> RANDOM_CITY
              </Button>
            </Link>
          </div>
        </div>
      </header>
    )
} 