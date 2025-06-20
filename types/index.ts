// ============================================================================
// CITY TYPES
// ============================================================================

export interface City {
  name: string
  lat: number
  lon: number
  country: string
  slug: string
}

// ============================================================================
// WEATHER TYPES
// ============================================================================

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
    hourly?: Array<{
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

export interface WeatherSectionProps {
  weather: WeatherData
}

// ============================================================================
// CITY DATA TYPES
// ============================================================================

export interface CityData {
  title: string
  extract: string
  thumbnail?: { source: string }
  content_urls?: { desktop: { page: string } }
}

// ============================================================================
// ISS TYPES
// ============================================================================

export interface ISSData {
  iss_position: { latitude: string; longitude: string }
  timestamp: number
}

// ============================================================================
// TOAST TYPES
// ============================================================================

export type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
} & React.ComponentPropsWithoutRef<typeof import("@/components/ui/toast").Toast>

export type Toast = Omit<ToasterToast, "id">

export type ActionType = {
  ADD_TOAST: "ADD_TOAST"
  UPDATE_TOAST: "UPDATE_TOAST"
  DISMISS_TOAST: "DISMISS_TOAST"
  REMOVE_TOAST: "REMOVE_TOAST"
}

export type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

export interface ToastState {
  toasts: ToasterToast[]
}

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

export type ToastActionElement = React.ReactElement<typeof import("@/components/ui/toast").ToastAction>

export type ToastProps = React.ComponentPropsWithoutRef<typeof import("@/components/ui/toast").Toast>

export type CalendarProps = React.ComponentProps<typeof import("@/components/ui/calendar").DayPicker>

export type ToasterProps = React.ComponentProps<typeof import("@/components/ui/sonner").Sonner>

export type ChartConfig = {
  data: any[]
  xKey: string
  yKey: string
  valueKey: string
  labelKey?: string
  colorKey?: string
  colors?: string[]
  height?: number
  width?: number
  margin?: { top: number; right: number; bottom: number; left: number }
  xAxis?: boolean
  yAxis?: boolean
  grid?: boolean
  tooltip?: boolean
  legend?: boolean
  animation?: boolean
  className?: string
}

export type ChartContextProps = {
  data: any[]
  xKey: string
  yKey: string
  valueKey: string
  labelKey?: string
  colorKey?: string
  colors: string[]
  height: number
  width: number
  margin: { top: number; right: number; bottom: number; left: number }
  xAxis: boolean
  yAxis: boolean
  grid: boolean
  tooltip: boolean
  legend: boolean
  animation: boolean
}

export type CarouselApi = ReturnType<typeof import("embla-carousel-react").useEmblaCarousel>[1]

export type UseCarouselParameters = Parameters<typeof import("embla-carousel-react").useEmblaCarousel>

export type CarouselOptions = UseCarouselParameters[0]

export type CarouselPlugin = UseCarouselParameters[1]

export type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof import("react").useRef<HTMLDivElement>>
  api: ReturnType<typeof import("embla-carousel-react").useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

export type FormItemContextValue = {
  id: string
}

export type SidebarContext = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isResizing: boolean
  setIsResizing: (resizing: boolean) => void
}

export type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentPropsWithoutRef<typeof import("@/components/ui/pagination").PaginationLink>

export type SheetContentProps = React.ComponentPropsWithoutRef<typeof import("@/components/ui/sheet").SheetContent>

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type TemperatureUnit = "C" | "F"

export type ColorVariant = 
  | "blue" 
  | "purple" 
  | "green" 
  | "orange" 
  | "pink" 
  | "cyan" 
  | "yellow" 
  | "red" 
  | "indigo" 
  | "emerald" 
  | "amber" 
  | "rose" 