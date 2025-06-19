import { list } from "@vercel/blob"

export async function getCityImages(citySlug: string) {
  try {
    const { blobs } = await list({
      prefix: `cities/${citySlug}/`,
      limit: 50,
    })

    return blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
    }))
  } catch (error) {
    console.error("Error fetching city images:", error)
    return []
  }
}
