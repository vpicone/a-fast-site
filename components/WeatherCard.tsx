"use client"

import { useState } from "react"
import { Cloud, Thermometer, Eye, Wind, Droplets, Sun, Moon, Gauge, Compass, CloudRain } from "lucide-react"
import { WeatherData } from "@/types/types"

export function WeatherCard({ weather }: { weather: WeatherData }) {
  const [unit, setUnit] = useState<"C" | "F">("C")

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C")
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-900/10 via-yellow-900/10 to-red-900/10 border border-orange-500/20 rounded-3xl p-8 mb-12 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl tracking-wider text-white font-bold">CURRENT_WEATHER_DATA</h2>
        </div>
        <button
          onClick={toggleUnit}
          className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-white px-4 py-2 rounded-xl tracking-wider font-mono text-sm transition-colors"
        >
          SWITCH_TO_°{unit === "C" ? "F" : "C"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Primary Weather Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <TemperatureMetric
            icon={<Thermometer className="h-4 w-4 text-orange-400" />}
            bg="orange-500"
            label="TEMPERATURE"
            tempC={weather.current_condition[0].temp_C}
            tempF={weather.current_condition[0].temp_F}
            unit={unit}
          />
          <TemperatureMetric
            icon={<Thermometer className="h-4 w-4 text-red-400" />}
            bg="red-500"
            label="FEELS_LIKE"
            tempC={weather.current_condition[0].FeelsLikeC}
            tempF={weather.current_condition[0].FeelsLikeF}
            unit={unit}
          />
          <Metric
            icon={<Cloud className="h-4 w-4 text-blue-400" />}
            bg="blue-500"
            label="CONDITION"
            value={weather.current_condition[0].weatherDesc[0].value.toUpperCase()}
            sub={`CLOUD_COVER ${weather.current_condition[0].cloudcover}%`}
          />
          <Metric
            icon={<Droplets className="h-4 w-4 text-cyan-400" />}
            bg="cyan-500"
            label="HUMIDITY"
            value={`${weather.current_condition[0].humidity}%`}
            sub={`PRECIP ${weather.current_condition[0].precipMM}MM`}
          />
        </div>

        {/* Wind & Pressure */}
        <div className="grid md:grid-cols-4 gap-6">
          <Metric
            icon={<Wind className="h-4 w-4 text-green-400" />}
            bg="green-500"
            label="WIND_SPEED"
            value={`${weather.current_condition[0].windspeedKmph} KM/H`}
            sub={`${weather.current_condition[0].windspeedMiles} MPH`}
          />
          <Metric
            icon={<Compass className="h-4 w-4 text-purple-400" />}
            bg="purple-500"
            label="WIND_DIRECTION"
            value={weather.current_condition[0].winddir16Point}
            sub={`${weather.current_condition[0].winddirDegree}°`}
          />
          <Metric
            icon={<Gauge className="h-4 w-4 text-yellow-400" />}
            bg="yellow-500"
            label="PRESSURE"
            value={`${weather.current_condition[0].pressure} MB`}
            sub={`${weather.current_condition[0].pressureInches}" HG`}
          />
          <Metric
            icon={<Eye className="h-4 w-4 text-indigo-400" />}
            bg="indigo-500"
            label="VISIBILITY"
            value={`${weather.current_condition[0].visibility} KM`}
            sub={
              Number(weather.current_condition[0].visibility) > 10
                ? "EXCELLENT"
                : Number(weather.current_condition[0].visibility) > 5
                  ? "GOOD"
                  : "LIMITED"
            }
          />
        </div>

        {/* UV & Precipitation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Metric
            icon={<Sun className="h-4 w-4 text-yellow-400" />}
            bg="yellow-500"
            label="UV_INDEX"
            value={weather.current_condition[0].uvIndex}
            sub={
              Number(weather.current_condition[0].uvIndex) > 7
                ? "VERY_HIGH"
                : Number(weather.current_condition[0].uvIndex) > 5
                  ? "HIGH"
                  : Number(weather.current_condition[0].uvIndex) > 2
                    ? "MODERATE"
                    : "LOW"
            }
          />
          <Metric
            icon={<CloudRain className="h-4 w-4 text-blue-400" />}
            bg="blue-500"
            label="PRECIPITATION"
            value={`${weather.current_condition[0].precipMM} MM`}
            sub={`${weather.current_condition[0].precipInches} INCHES`}
          />
        </div>

        {/* Today's Forecast */}
        {weather.weather && weather.weather[0] && (
          <div className="border-t border-orange-500/20 pt-8">
            <h3 className="text-xl font-bold tracking-wider mb-6 text-white">TODAY'S_FORECAST</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <TemperatureMetric
                icon={<Thermometer className="h-4 w-4 text-red-400" />}
                bg="red-500"
                label="MAX_TEMP"
                tempC={weather.weather[0].maxtempC}
                tempF={weather.weather[0].maxtempF}
                unit={unit}
              />
              <TemperatureMetric
                icon={<Thermometer className="h-4 w-4 text-blue-400" />}
                bg="blue-500"
                label="MIN_TEMP"
                tempC={weather.weather[0].mintempC}
                tempF={weather.weather[0].mintempF}
                unit={unit}
              />
              <Metric
                icon={<Sun className="h-4 w-4 text-yellow-400" />}
                bg="yellow-500"
                label="SUN_HOURS"
                value={`${weather.weather[0].sunHour} HRS`}
                sub={`UV_INDEX ${weather.weather[0].uvIndex}`}
              />
            </div>

            {/* Astronomy Data */}
            {weather.weather[0].astronomy && weather.weather[0].astronomy[0] && (
              <div className="grid md:grid-cols-4 gap-6">
                <Metric
                  icon={<Sun className="h-4 w-4 text-orange-400" />}
                  bg="orange-500"
                  label="SUNRISE"
                  value={weather.weather[0].astronomy[0].sunrise}
                />
                <Metric
                  icon={<Sun className="h-4 w-4 text-red-400" />}
                  bg="red-500"
                  label="SUNSET"
                  value={weather.weather[0].astronomy[0].sunset}
                />
                <Metric
                  icon={<Moon className="h-4 w-4 text-blue-400" />}
                  bg="blue-500"
                  label="MOON_PHASE"
                  value={weather.weather[0].astronomy[0].moon_phase.toUpperCase()}
                  sub={`${weather.weather[0].astronomy[0].moon_illumination}% LIT`}
                />
                <Metric
                  icon={<Moon className="h-4 w-4 text-purple-400" />}
                  bg="purple-500"
                  label="MOONRISE"
                  value={weather.weather[0].astronomy[0].moonrise}
                  sub={`SET ${weather.weather[0].astronomy[0].moonset}`}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Temperature Metric Component ---------- */
function TemperatureMetric({
  icon,
  bg,
  label,
  tempC,
  tempF,
  unit,
}: {
  icon: React.ReactNode
  bg: string
  label: string
  tempC: string
  tempF: string
  unit: "C" | "F"
}) {
  const primaryTemp = unit === "C" ? tempC : tempF
  const secondaryTemp = unit === "C" ? tempF : tempC
  const primaryUnit = unit
  const secondaryUnit = unit === "C" ? "F" : "C"

  return (
    <div className="bg-black/20 border border-zinc-800 rounded-2xl p-6 h-full text-center space-y-4">
      <div className={`w-8 h-8 bg-${bg}/20 rounded-lg flex items-center justify-center mx-auto`}>{icon}</div>
      <div className="text-xs text-zinc-400 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-bold tracking-wider text-white">
        {primaryTemp}°{primaryUnit}
      </div>
      <div className="text-sm text-zinc-400 tracking-wide">
        {secondaryTemp}°{secondaryUnit}
      </div>
    </div>
  )
}

/* ---------- Regular Metric Component ---------- */
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
      <div className="text-2xl font-bold tracking-wider text-white">{value}</div>
      {sub && <div className="text-sm text-zinc-400 tracking-wide">{sub}</div>}
    </div>
  )
}
