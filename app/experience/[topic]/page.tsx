import type React from "react"
import { notFound } from "next/navigation"
import { MAJOR_CITIES } from "@/lib/cities"
import { CityData } from "@/types/types"
import { getCityWiki, getISSData, getWeather } from "@/lib/actions"

// SSR Components
import { ISSCard } from "@/components/ISSCard"
import { WikiCard } from "@/components/WikiCard"
import { WeatherCard } from "@/components/WeatherCard"

// import { Suspense } from "react"
// import { ErrorBoundary } from "next/dist/client/components/error-boundary"
// import ErrorComponent from "@/components/ErrorComponent"
// import { WikiStream } from "@/components/WikiStream"
// import { ISSStream } from "@/components/ISSStream"
// import { WeatherStream } from "@/components/WeatherStream"
// import { Loading } from "@/components/Loading"

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ topic: string }>
}) {
  const { topic } = await params

  // get the city! 
  const cityInfo = MAJOR_CITIES.find((c) => c.slug === topic.toLowerCase())
  if (!cityInfo) notFound()

  const [cityWiki, iss, weather] = await Promise.all([getCityWiki(cityInfo.name), getISSData(), getWeather(cityInfo.name)])
  const cityData: CityData = {
    title: cityInfo.name,
    extract: `${cityInfo.name} – dynamic demo city.`,
    coordinates: { lat: cityInfo.lat, lon: cityInfo.lon }
  }
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="container mx-auto px-6 py-12 max-w-5xl">
          <h1 className="text-center text-5xl md:text-7xl font-bold mb-12 leading-none tracking-tight">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {cityData.title.toUpperCase()}
            </span>
          </h1>

          {/* SSR Components */}
          <WikiCard cityData={cityData} />
          {weather && <WeatherCard weather={weather} />}
          <ISSCard city={cityData} iss={iss} />

          {/* Streaming Components */}
          {/* <ErrorBoundary errorComponent={ErrorComponent}>
            <Suspense fallback={<Loading />}>
              <WikiStream cityWiki={cityInfo.name} />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <WeatherStream city={cityInfo.name} unit="C" />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <ISSStream city={cityData} />
            </Suspense>
          </ErrorBoundary> */}
        </main>
      </div>
    )
}

