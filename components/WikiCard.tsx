import { ExternalLink, Link, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { CityData } from "@/types/types";

export function WikiCard({ cityData }: { cityData: CityData }) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 tracking-wider text-2xl text-white">
          <MapPin className="h-5 w-5 text-blue-400" /> CITY_INFORMATION
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-8">
          {cityData.thumbnail?.source && (
            <Image
              src={cityData.thumbnail.source || "/placeholder.svg"}
              alt={cityData.title}
              width={300}
              height={200}
              className="rounded-xl object-cover border border-zinc-800"
            />
          )}

          <div className="md:col-span-2 space-y-4">
            <p className="text-zinc-300 tracking-wide">{cityData.extract}</p>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <p className="text-sm text-zinc-400 tracking-widest mb-1">COORDINATES</p>
              <code className="text-blue-400 tracking-wider">
                {cityData.coordinates.lat.toFixed(2)}°, {cityData.coordinates.lon.toFixed(2)}°
              </code>
            </div>
            <a
              href={cityData.content_urls?.desktop.page || ""}
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm tracking-wider"
            >
              LEARN_MORE_ON_WIKIPEDIA <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}






                