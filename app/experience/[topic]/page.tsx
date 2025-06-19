import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, RefreshCw, MapPin, Satellite, ExternalLink, Cloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MAJOR_CITIES } from "@/lib/cities"

/* ---------- Types ---------- */
interface CityData {
  title: string
  extract: string
  thumbnail?: { source: string }
  content_urls?: { desktop: { page: string } }
}

interface ISSData {
  iss_position: { latitude: string; longitude: string }
  timestamp: number
}

interface WeatherData {
  current_condition: Array<{
    temp_C: string
    temp_F: string
    FeelsLikeC: string
    weatherDesc: Array<{ value: string }>
    humidity: string
    visibility: string
    windspeedKmph: string
    winddir16Point: string
  }>
}

/* ---------- Helpers ---------- */
const EARTH_RADIUS_KM = 6371
const toRad = (deg: number) => (deg * Math.PI) / 180
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/* ---------- Data fetchers ---------- */
async function getCityWiki(cityName: string): Promise<CityData | null> {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`, {
      next: { revalidate: 60 * 60 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function getISS(): Promise<ISSData> {
  // deterministic, simulated orbit (avoids external API flakiness)
  const p = ((Date.now() / 1000) % 5580) / 5580 // one full orbit every 5580 s
  const lat = Math.sin(p * Math.PI * 2) * 51.6
  const lon = ((p * 360 - 180) % 360) - 180
  return {
    iss_position: { latitude: lat.toFixed(4), longitude: lon.toFixed(4) },
    timestamp: Math.floor(Date.now() / 1000),
  }
}

async function getWeather(city: string): Promise<WeatherData | null> {
  try {
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`, {
      headers: { "User-Agent": "CityExplorer/1.0" },
      next: { revalidate: 60 * 30 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

/* ---------- City helpers ---------- */
function findCity(slug: string) {
  return MAJOR_CITIES.find((c) => c.slug === slug.toLowerCase())
}

function randomCity() {
  return MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)]
}

/* ---------- Metadata ---------- */
export const metadata: Metadata = {
  title: "City Explorer + ISS + Weather",
}

/* ---------- Page component ---------- */
export default async function ExperiencePage({
  params,
}: {
  params: { topic: string }
}) {
  const { topic } = params
  const cityInfo = findCity(topic)

  if (!cityInfo) notFound()

  const [cityWiki, iss, weather] = await Promise.all([getCityWiki(cityInfo.name), getISS(), getWeather(cityInfo.name)])

  const cityData: CityData = cityWiki ?? {
    title: cityInfo.name,
    extract: `${cityInfo.name} – dynamic demo city.`,
  }

  // distance ISS → city
  const issLat = Number(iss.iss_position.latitude)
  const issLon = Number(iss.iss_position.longitude)
  const distanceKm = haversine(issLat, issLon, cityInfo.lat, cityInfo.lon)
  const issNearby = distanceKm < 500

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="tracking-wider">
              <ArrowLeft className="mr-2 h-4 w-4" /> BACK_TO_HOME
            </Button>
          </Link>
          <Link href={`/experience/${randomCity().slug}`}>
            <Button variant="outline" className="tracking-wider">
              <RefreshCw className="mr-2 h-4 w-4" /> RANDOM_CITY
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Title */}
        <h1 className="text-center text-5xl md:text-7xl font-bold mb-12 leading-none tracking-tight">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {cityData.title.toUpperCase()}
          </span>
        </h1>

        {/* Main Data Grid - 3 columns on large screens */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Weather Card */}
          {weather && (
            <Card className="relative overflow-hidden bg-gradient-to-br from-orange-900/10 via-yellow-900/10 to-red-900/10 border border-orange-500/20 rounded-3xl p-6 backdrop-blur-sm">
              <CardHeader className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Cloud className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg tracking-wider">CURRENT_WEATHER</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
                    <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">TEMPERATURE</div>
                    <div className="text-2xl font-bold tracking-wider">{weather.current_condition[0].temp_C}°C</div>
                    <div className="text-sm text-zinc-400 tracking-wide">{weather.current_condition[0].temp_F}°F</div>
                  </div>
                  <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
                    <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">CONDITION</div>
                    <div className="text-lg font-bold tracking-wider">
                      {weather.current_condition[0].weatherDesc[0].value.toUpperCase()}
                    </div>
                    <div className="text-sm text-zinc-400 tracking-wide">
                      HUMIDITY {weather.current_condition[0].humidity}%
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 border border-zinc-800 rounded-xl p-3 text-center">
                      <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">WIND</div>
                      <div className="text-sm font-bold tracking-wider">
                        {weather.current_condition[0].windspeedKmph} KM/H
                      </div>
                      <div className="text-xs text-zinc-500">{weather.current_condition[0].winddir16Point}</div>
                    </div>
                    <div className="bg-black/20 border border-zinc-800 rounded-xl p-3 text-center">
                      <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">VISIBILITY</div>
                      <div className="text-sm font-bold tracking-wider">
                        {weather.current_condition[0].visibility} KM
                      </div>
                      <div className="text-xs text-zinc-500">
                        {Number(weather.current_condition[0].visibility) > 10
                          ? "EXCELLENT"
                          : Number(weather.current_condition[0].visibility) > 5
                            ? "GOOD"
                            : "LIMITED"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* City Info Card */}
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 tracking-wider text-lg">
                <MapPin className="h-5 w-5 text-blue-400" /> CITY_INFORMATION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityData.thumbnail?.source && (
                  <Image
                    src={cityData.thumbnail.source || "/placeholder.svg"}
                    alt={cityData.title}
                    width={300}
                    height={200}
                    className="rounded-xl object-cover border border-zinc-800 w-full"
                  />
                )}

                <p className="text-zinc-300 tracking-wide text-sm leading-relaxed">{cityData.extract}</p>

                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <p className="text-xs text-zinc-400 tracking-widest mb-1">COORDINATES</p>
                  <code className="text-blue-400 tracking-wider text-sm">
                    {cityInfo.lat.toFixed(2)}°, {cityInfo.lon.toFixed(2)}°
                  </code>
                </div>

                {cityData.content_urls && (
                  <Link
                    href={cityData.content_urls.desktop.page}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm tracking-wider"
                  >
                    LEARN_MORE_ON_WIKIPEDIA <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ISS Card */}
          <Card className="bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10 border border-blue-500/20 rounded-3xl p-6 backdrop-blur-sm">
            <CardHeader className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Satellite className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg tracking-wider">SPACE_STATION</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">LATITUDE</div>
                <div className="text-2xl font-bold tracking-wider">{iss.iss_position.latitude}°</div>
              </div>
              <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">LONGITUDE</div>
                <div className="text-2xl font-bold tracking-wider">{iss.iss_position.longitude}°</div>
              </div>
              <div className="bg-black/20 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1">DISTANCE_TO_CITY</div>
                <div className="text-2xl font-bold tracking-wider">{Math.round(distanceKm)} KM</div>
                {issNearby && <div className="text-sm text-zinc-400 tracking-wide">🚀 OVERHEAD!</div>}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

/* ---------- Re-usable metric tile ---------- */
function Metric({
  icon,
  bg,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  bg: string
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="bg-black/20 border border-zinc-800 rounded-2xl p-6 h-full text-center space-y-4">
      <div className={`w-8 h-8 bg-${bg}/20 rounded-lg flex items-center justify-center mx-auto`}>{icon}</div>
      <div className="text-xs text-zinc-400 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-bold tracking-wider">{value}</div>
      {sub && <div className="text-sm text-zinc-400 tracking-wide">{sub}</div>}
    </div>
  )
}
