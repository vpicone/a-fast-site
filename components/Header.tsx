import { Sparkles } from "lucide-react"

export default function Header() {
    return (
      
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">CITY_EXPLORER</h1>
                <p className="text-xs text-zinc-400 tracking-wider">+ ISS_TRACKER</p>
              </div>
            </div>
            <div className="text-xs text-zinc-500 tracking-widest">VERCEL_SHIP_2025</div>
          </div>
        </div>
      </header>
    )
} 