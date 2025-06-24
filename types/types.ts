/* ---------- Types ---------- */
export interface CityData {
  title: string
  extract: string
  thumbnail?: { source: string }
  content_urls?: { desktop: { page: string } }
  coordinates: { lat: number, lon: number }
}

export interface ISSData {
  iss_position: { latitude: string; longitude: string }
  timestamp: number
}

export interface WeatherData {
  current_condition: Array<{
    temp_C: string
    temp_F: string
    FeelsLikeC: string
    FeelsLikeF: string
    weatherDesc: Array<{ value: string }>
    humidity: string
    visibility: string
    windspeedKmph: string
    windspeedMiles: string
    winddir16Point: string
    winddirDegree: string
    pressure: string
    pressureInches: string
    cloudcover: string
    uvIndex: string
    precipMM: string
    precipInches: string
  }>
  weather?: Array<{
    date: string
    maxtempC: string
    maxtempF: string
    mintempC: string
    mintempF: string
    sunHour: string
    uvIndex: string
    astronomy: Array<{
      sunrise: string
      sunset: string
      moonrise: string
      moonset: string
      moon_phase: string
      moon_illumination: string
    }>
    hourly: Array<{
      time: string
      tempC: string
      tempF: string
      windspeedKmph: string
      winddirDegree: string
      weatherDesc: Array<{ value: string }>
      precipMM: string
      humidity: string
      visibility: string
      pressure: string
      cloudcover: string
      FeelsLikeC: string
      FeelsLikeF: string
      chanceofrain: string
      chanceofsnow: string
    }>
  }>
}