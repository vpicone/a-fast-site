import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, RefreshCw, MapPin, Satellite, ExternalLink, Zap, Cloud, Thermometer, Eye, Wind } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// ---------- Types ----------
interface CityData {
  title: string
  extract: string
  thumbnail?: { source: string }
  content_urls?: { desktop: { page: string } }
  coordinates?: { lat: number; lon: number }
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
  nearest_area?: Array<{
    areaName: Array<{ value: string }>
    country: Array<{ value: string }>
  }>
}

// ---------- Static data ----------
/**
 * NOTE:  we shortened the list here for brevity.
 * Add more cities as needed – the code works for **any** city object
 * with { name, lat, lon, country, slug }.
 */
const MAJOR_CITIES = [
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, country: "Japan", slug: "tokyo" },
  { name: "London", lat: 51.5074, lon: -0.1278, country: "United Kingdom", slug: "london" },
  { name: "New York City", lat: 40.7128, lon: -74.006, country: "USA", slug: "nyc" },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, country: "Australia", slug: "sydney" },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333, country: "Brazil", slug: "sao-paulo" },
  // … (keep adding if you wish)
]

// ---------- Helpers ----------
const EARTH_RADIUS_KM = 6371
function toRad(angle: number) {
  return (angle * Math.PI) / 180
}
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// ---------- Data fetchers ----------
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
  // Reliable, simulated orbit
  const p = ((Date.now() / 1000) % 5580) / 5580
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

// ---------- Core util ----------
function findCity(topic: string) {
  const slug = topic.toLowerCase()
  return (
    MAJOR_CITIES.find((c) => c.slug === slug) ??
    MAJOR_CITIES.find((c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug)
  )
}
function randomCity() {
  return MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)]
}

// ---------- Page component ----------
export const metadata: Metadata = {
  title: "City Explorer + ISS + Weather",
}

export default async function ExperiencePage({
  params,
}: {
  params: { topic: string }
}) {
  const { topic } = params

  const cityInfo = topic.startsWith("city-") ? randomCity() : findCity(topic)
  if (!cityInfo) notFound()

  const [cityWiki, iss, weather] = await Promise.all([getCityWiki(cityInfo.name), getISS(), getWeather(cityInfo.name)])

  const cityData: CityData = cityWiki ?? {
    title: cityInfo.name,
    extract: `${cityInfo.name} – dynamic demo city.`,
  }

  // Distance ISS->city
  const issLat = Number(iss.iss_position.latitude)
  const issLon = Number(iss.iss_position.longitude)
  const distanceKm = haversine(issLat, issLon, cityInfo.lat, cityInfo.lon)
  const issNearby = distanceKm < 500

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-black text-white font-mono">
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

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* ---- TITLE ---- */}
        <h1 className="text-center text-5xl md:text-7xl font-bold mb-12 leading-none tracking-tight">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {cityData.title.toUpperCase()}
          </span>
        </h1>

        {/* ---- WEATHER CARD ---- */}
        {weather && (
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-900/10 via-yellow-900/10 to-red-900/10 border border-orange-500/20 rounded-3xl p-8 mb-12 backdrop-blur-sm">
            <CardHeader className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl tracking-wider">CURRENT_WEATHER</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {/* Temp */}
                <Metric
                  icon={<Thermometer className="h-4 w-4 text-orange-400" />}
                  bg="orange-500"
                  label="TEMPERATURE"
                  value={`${weather.current_condition[0].temp_C}°C`}
                  sub={weather.current_condition[0].temp_F + "°F"}
                />
                {/* Condition */}
                <Metric
                  icon={<Cloud className="h-4 w-4 text-blue-400" />}
                  bg="blue-500"
                  label="CONDITION"
                  value={weather.current_condition[0].weatherDesc[0].value.toUpperCase()}
                  sub={`HUMIDITY ${weather.current_condition[0].humidity}%`}
                />
                {/* Wind */}
                <Metric
                  icon={<Wind className="h-4 w-4 text-cyan-400" />}
                  bg="cyan-500"
                  label="WIND"
                  value={weather.current_condition[0].windspeedKmph + " KM/H"}
                  sub={weather.current_condition[0].winddir16Point}
                />
                {/* Visibility */}
                <Metric
                  icon={<Eye className="h-4 w-4 text-purple-400" />}
                  bg="purple-500"
                  label="VISIBILITY"
                  value={weather.current_condition[0].visibility + " KM"}
                  sub={
                    Number(weather.current_condition[0].visibility) > 10
                      ? "EXCELLENT"
                      : Number(weather.current_condition[0].visibility) > 5
                        ? "GOOD"
                        : "LIMITED"
                  }
                />
              </div>
            </CardContent>
          </div>
        )}

        {/* ---- CITY INFO ---- */}
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 tracking-wider text-2xl">
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
            </div>
          </CardContent>
        </Card>

        {/* ---- ISS CARD ---- */}
        <Card className="bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-sm">
          <CardHeader className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Satellite className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl tracking-wider">INTERNATIONAL_SPACE_STATION</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-3 gap-6">
            <Metric
              icon={<Zap className="h-4 w-4 text-blue-400" />}
              bg="blue-500"
              label="LATITUDE"
              value={iss.iss_position.latitude + "°"}
            />
            <Metric
              icon={<Zap className="h-4 w-4 text-purple-400" />}
              bg="purple-500"
              label="LONGITUDE"
              value={iss.iss_position.longitude + "°"}
            />
            <Metric
              icon={<MapPin className="h-4 w-4 text-green-400" />}
              bg="green-500"
              label="DISTANCE_TO_CITY"
              value={Math.round(distanceKm) + " KM"}
              sub={issNearby ? "🚀 OVERHEAD!" : undefined}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// ---------- Re-usable metric tile ----------
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
