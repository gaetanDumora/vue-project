export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}
export interface Metrics {
  humidity: number
  temp: number
}
export interface WeatherResultType {
  main: Metrics
  weather: Weather[]
}
