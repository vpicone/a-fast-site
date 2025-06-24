// Script to fix the 14 cities that are failing Wikipedia validation

const failingCities = [
  { name: "New York", currentSlug: "nyc", suggestedSlug: "new-york-city" },
  { name: "Phoenix", currentSlug: "phoenix", suggestedSlug: "phoenix-arizona" },
  { name: "San Jose", currentSlug: "san-jose", suggestedSlug: "san-jose-california" },
  { name: "Austin", currentSlug: "austin", suggestedSlug: "austin-texas" },
  { name: "Columbus", currentSlug: "columbus", suggestedSlug: "columbus-ohio" },
  { name: "Charlotte", currentSlug: "charlotte", suggestedSlug: "charlotte-north-carolina" },
  { name: "Memphis", currentSlug: "memphis", suggestedSlug: "memphis-tennessee" },
  { name: "Portland", currentSlug: "portland", suggestedSlug: "portland-oregon" },
  { name: "Hamilton", currentSlug: "hamilton", suggestedSlug: "hamilton-ontario" },
  { name: "Salvador", currentSlug: "salvador", suggestedSlug: "salvador-bahia" },
  { name: "Córdoba", currentSlug: "cordoba", suggestedSlug: "cordoba-argentina" },
  { name: "Kano", currentSlug: "kano", suggestedSlug: "kano-nigeria" },
  { name: "Gold Coast", currentSlug: "gold-coast", suggestedSlug: "gold-coast-queensland" },
  { name: "Newcastle", currentSlug: "newcastle", suggestedSlug: "newcastle-new-south-wales" },
]

async function validateWikipediaSlug(slug) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CityExplorer/1.0 (validation script)",
      },
    })

    if (response.ok) {
      const data = await response.json()
      return {
        success: true,
        title: data.title,
        extract: data.extract ? data.extract.substring(0, 100) + "..." : "No extract",
        hasImage: !!data.thumbnail,
        url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${slug}`,
      }
    } else {
      return {
        success: false,
        status: response.status,
        statusText: response.statusText,
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

async function testAlternatives() {
  console.log("🔧 Testing alternative Wikipedia slugs for failing cities...\n")

  const results = {
    fixed: [],
    stillFailing: [],
  }

  for (const city of failingCities) {
    console.log(`Testing ${city.name}:`)
    console.log(`  Current slug: "${city.currentSlug}"`)

    // Test current slug
    const currentResult = await validateWikipediaSlug(city.currentSlug)
    if (currentResult.success) {
      console.log(`  ✅ Current slug works: "${currentResult.title}"`)
      console.log(`  📷 Has image: ${currentResult.hasImage ? "Yes" : "No"}`)
      results.fixed.push({
        ...city,
        workingSlug: city.currentSlug,
        title: currentResult.title,
        hasImage: currentResult.hasImage,
      })
    } else {
      console.log(`  ❌ Current slug fails: ${currentResult.error || currentResult.status}`)

      // Test suggested slug
      console.log(`  Trying suggested: "${city.suggestedSlug}"`)
      const suggestedResult = await validateWikipediaSlug(city.suggestedSlug)

      if (suggestedResult.success) {
        console.log(`  ✅ Suggested slug works: "${suggestedResult.title}"`)
        console.log(`  📷 Has image: ${suggestedResult.hasImage ? "Yes" : "No"}`)
        results.fixed.push({
          ...city,
          workingSlug: city.suggestedSlug,
          title: suggestedResult.title,
          hasImage: suggestedResult.hasImage,
        })
      } else {
        console.log(`  ❌ Suggested slug also fails: ${suggestedResult.error || suggestedResult.status}`)
        results.stillFailing.push(city)
      }
    }

    console.log() // Empty line for readability

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  // Print summary
  console.log("📊 RESULTS SUMMARY:")
  console.log(`✅ Fixed: ${results.fixed.length}`)
  console.log(`❌ Still failing: ${results.stillFailing.length}`)

  if (results.fixed.length > 0) {
    console.log("\n✅ WORKING SLUGS:")
    results.fixed.forEach((city) => {
      console.log(`  ${city.name}: "${city.currentSlug}" → "${city.workingSlug}"`)
      console.log(`    Title: "${city.title}"`)
      console.log(`    Has image: ${city.hasImage ? "Yes" : "No"}`)
    })
  }

  if (results.stillFailing.length > 0) {
    console.log("\n❌ STILL FAILING:")
    results.stillFailing.forEach((city) => {
      console.log(`  ${city.name}: Both "${city.currentSlug}" and "${city.suggestedSlug}" failed`)
    })
  }

  // Generate the corrected city entries
  if (results.fixed.length > 0) {
    console.log("\n🔧 CORRECTED CITY ENTRIES:")
    console.log("Replace these entries in lib/cities.ts:")
    results.fixed.forEach((city) => {
      if (city.workingSlug !== city.currentSlug) {
        console.log(
          `  { name: "${city.name}", lat: [LAT], lon: [LON], country: "[COUNTRY]", slug: "${city.workingSlug}" },`,
        )
      }
    })
  }

  return results
}

// Run the test
testAlternatives().catch(console.error)
