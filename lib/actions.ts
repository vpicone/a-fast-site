'use server'

export async function getCityData(citySlug: string) {
  const cityData = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${citySlug}`)
  return cityData.json()
}