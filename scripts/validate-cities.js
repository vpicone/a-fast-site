// Script to validate that all cities in our list have valid Wikipedia entries

const MAJOR_CITIES = [
  // Asia
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, country: "Japan", slug: "tokyo" },
  { name: "Seoul", lat: 37.5665, lon: 126.978, country: "South Korea", slug: "seoul" },
  { name: "Beijing", lat: 39.9042, lon: 116.4074, country: "China", slug: "beijing" },
  { name: "Shanghai", lat: 31.2304, lon: 121.4737, country: "China", slug: "shanghai" },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694, country: "Hong Kong", slug: "hong-kong" },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, country: "Singapore", slug: "singapore" },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018, country: "Thailand", slug: "bangkok" },
  { name: "Mumbai", lat: 19.076, lon: 72.8777, country: "India", slug: "mumbai" },
  { name: "Delhi", lat: 28.7041, lon: 77.1025, country: "India", slug: "delhi" },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946, country: "India", slug: "bangalore" },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639, country: "India", slug: "kolkata" },
  { name: "Chennai", lat: 13.0827, lon: 80.2707, country: "India", slug: "chennai" },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867, country: "India", slug: "hyderabad" },
  { name: "Karachi", lat: 24.8607, lon: 67.0011, country: "Pakistan", slug: "karachi" },
  { name: "Lahore", lat: 31.5204, lon: 74.3587, country: "Pakistan", slug: "lahore" },
  { name: "Dhaka", lat: 23.8103, lon: 90.4125, country: "Bangladesh", slug: "dhaka" },
  { name: "Jakarta", lat: -6.2088, lon: 106.8456, country: "Indonesia", slug: "jakarta" },
  { name: "Manila", lat: 14.5995, lon: 120.9842, country: "Philippines", slug: "manila" },
  { name: "Ho Chi Minh City", lat: 10.8231, lon: 106.6297, country: "Vietnam", slug: "ho-chi-minh-city" },
  { name: "Hanoi", lat: 21.0285, lon: 105.8542, country: "Vietnam", slug: "hanoi" },
  { name: "Kuala Lumpur", lat: 3.139, lon: 101.6869, country: "Malaysia", slug: "kuala-lumpur" },
  { name: "Taipei", lat: 25.033, lon: 121.5654, country: "Taiwan", slug: "taipei" },
  { name: "Osaka", lat: 34.6937, lon: 135.5023, country: "Japan", slug: "osaka" },
  { name: "Kyoto", lat: 35.0116, lon: 135.7681, country: "Japan", slug: "kyoto" },
  { name: "Busan", lat: 35.1796, lon: 129.0756, country: "South Korea", slug: "busan" },

  // Europe
  { name: "London", lat: 51.5074, lon: -0.1278, country: "United Kingdom", slug: "london" },
  { name: "Liverpool", lat: 53.4084, lon: -2.9916, country: "United Kingdom", slug: "liverpool" },
  { name: "Paris", lat: 48.8566, lon: 2.3522, country: "France", slug: "paris" },
  { name: "Berlin", lat: 52.52, lon: 13.405, country: "Germany", slug: "berlin" },
  { name: "Madrid", lat: 40.4168, lon: -3.7038, country: "Spain", slug: "madrid" },
  { name: "Rome", lat: 41.9028, lon: 12.4964, country: "Italy", slug: "rome" },
  { name: "Amsterdam", lat: 52.3676, lon: 4.9041, country: "Netherlands", slug: "amsterdam" },
  { name: "Vienna", lat: 48.2082, lon: 16.3738, country: "Austria", slug: "vienna" },
  { name: "Prague", lat: 50.0755, lon: 14.4378, country: "Czech Republic", slug: "prague" },
  { name: "Budapest", lat: 47.4979, lon: 19.0402, country: "Hungary", slug: "budapest" },
  { name: "Warsaw", lat: 52.2297, lon: 21.0122, country: "Poland", slug: "warsaw" },
  { name: "Stockholm", lat: 59.3293, lon: 18.0686, country: "Sweden", slug: "stockholm" },
  { name: "Copenhagen", lat: 55.6761, lon: 12.5683, country: "Denmark", slug: "copenhagen" },
  { name: "Oslo", lat: 59.9139, lon: 10.7522, country: "Norway", slug: "oslo" },
  { name: "Helsinki", lat: 60.1699, lon: 24.9384, country: "Finland", slug: "helsinki" },
  { name: "Brussels", lat: 50.8503, lon: 4.3517, country: "Belgium", slug: "brussels" },
  { name: "Zurich", lat: 47.3769, lon: 8.5417, country: "Switzerland", slug: "zurich" },
  { name: "Geneva", lat: 46.2044, lon: 6.1432, country: "Switzerland", slug: "geneva" },
  { name: "Munich", lat: 48.1351, lon: 11.582, country: "Germany", slug: "munich" },
  { name: "Hamburg", lat: 53.5511, lon: 9.9937, country: "Germany", slug: "hamburg" },
  { name: "Frankfurt", lat: 50.1109, lon: 8.6821, country: "Germany", slug: "frankfurt" },
  { name: "Milan", lat: 45.4642, lon: 9.19, country: "Italy", slug: "milan" },
  { name: "Naples", lat: 40.8518, lon: 14.2681, country: "Italy", slug: "naples" },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734, country: "Spain", slug: "barcelona" },
  { name: "Lisbon", lat: 38.7223, lon: -9.1393, country: "Portugal", slug: "lisbon" },
  { name: "Athens", lat: 37.9838, lon: 23.7275, country: "Greece", slug: "athens" },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784, country: "Turkey", slug: "istanbul" },
  { name: "Dublin", lat: 53.3498, lon: -6.2603, country: "Ireland", slug: "dublin" },
  { name: "Edinburgh", lat: 55.9533, lon: -3.1883, country: "United Kingdom", slug: "edinburgh" },

  // North America
  { name: "New York City", lat: 40.7128, lon: -74.006, country: "United States", slug: "new-york-city" },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, country: "United States", slug: "los-angeles" },
  { name: "Chicago", lat: 41.8781, lon: -87.6298, country: "United States", slug: "chicago" },
  { name: "Houston", lat: 29.7604, lon: -95.3698, country: "United States", slug: "houston" },
  { name: "Phoenix, Arizona", lat: 33.4484, lon: -112.074, country: "United States", slug: "phoenix-arizona" },
  { name: "Philadelphia", lat: 39.9526, lon: -75.1652, country: "United States", slug: "philadelphia" },
  { name: "San Antonio", lat: 29.4241, lon: -98.4936, country: "United States", slug: "san-antonio" },
  { name: "San Diego", lat: 32.7157, lon: -117.1611, country: "United States", slug: "san-diego" },
  { name: "Dallas", lat: 32.7767, lon: -96.797, country: "United States", slug: "dallas" },
  { name: "San Jose, California", lat: 37.3382, lon: -121.8863, country: "United States", slug: "san-jose-california" },
  { name: "Austin, Texas", lat: 30.2672, lon: -97.7431, country: "United States", slug: "austin-texas" },
  { name: "Cincinnati", lat: 39.1031, lon: -84.512, country: "United States", slug: "cincinnati" },
  { name: "Jacksonville", lat: 30.3322, lon: -81.6557, country: "United States", slug: "jacksonville" },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194, country: "United States", slug: "san-francisco" },
  { name: "Columbus, Ohio", lat: 39.9612, lon: -82.9988, country: "United States", slug: "columbus-ohio" },
  { name: "Charlotte, North Carolina", lat: 35.2271, lon: -80.8431, country: "United States", slug: "charlotte-north-carolina" },
  { name: "Fort Worth", lat: 32.7555, lon: -97.3308, country: "United States", slug: "fort-worth" },
  { name: "Detroit", lat: 42.3314, lon: -83.0458, country: "United States", slug: "detroit" },
  { name: "El Paso", lat: 31.7619, lon: -106.485, country: "United States", slug: "el-paso" },
  { name: "Memphis, Tennessee", lat: 35.1495, lon: -90.049, country: "United States", slug: "memphis-tennessee" },
  { name: "Seattle", lat: 47.6062, lon: -122.3321, country: "United States", slug: "seattle" },
  { name: "Denver", lat: 39.7392, lon: -104.9903, country: "United States", slug: "denver" },
  { name: "Washington DC", lat: 38.9072, lon: -77.0369, country: "United States", slug: "washington-dc" },
  { name: "Boston", lat: 42.3601, lon: -71.0589, country: "United States", slug: "boston" },
  { name: "Nashville", lat: 36.1627, lon: -86.7816, country: "United States", slug: "nashville" },
  { name: "Baltimore", lat: 39.2904, lon: -76.6122, country: "United States", slug: "baltimore" },
  { name: "Oklahoma City", lat: 35.4676, lon: -97.5164, country: "United States", slug: "oklahoma-city" },
  { name: "Portland, Oregon", lat: 45.5152, lon: -122.6784, country: "United States", slug: "portland-oregon" },
  { name: "Las Vegas", lat: 36.1699, lon: -115.1398, country: "United States", slug: "las-vegas" },
  { name: "Louisville", lat: 38.2527, lon: -85.7585, country: "United States", slug: "louisville" },
  { name: "Milwaukee", lat: 43.0389, lon: -87.9065, country: "United States", slug: "milwaukee" },
  { name: "Albuquerque", lat: 35.0844, lon: -106.6504, country: "United States", slug: "albuquerque" },
  { name: "Tucson", lat: 32.2226, lon: -110.9747, country: "United States", slug: "tucson" },
  { name: "Fresno", lat: 36.7378, lon: -119.7871, country: "United States", slug: "fresno" },
  { name: "Sacramento", lat: 38.5816, lon: -121.4944, country: "United States", slug: "sacramento" },
  { name: "Mesa", lat: 33.4152, lon: -111.8315, country: "United States", slug: "mesa" },
  { name: "Kansas City", lat: 39.0997, lon: -94.5786, country: "United States", slug: "kansas-city" },
  { name: "Atlanta", lat: 33.749, lon: -84.388, country: "United States", slug: "atlanta" },
  { name: "Miami", lat: 25.7617, lon: -80.1918, country: "United States", slug: "miami" },
  { name: "Raleigh", lat: 35.7796, lon: -78.6382, country: "United States", slug: "raleigh" },
  { name: "Omaha", lat: 41.2565, lon: -95.9345, country: "United States", slug: "omaha" },
  { name: "Colorado Springs", lat: 38.8339, lon: -104.8214, country: "United States", slug: "colorado-springs" },
  { name: "Virginia Beach", lat: 36.8529, lon: -75.978, country: "United States", slug: "virginia-beach" },
  { name: "Toronto", lat: 43.6532, lon: -79.3832, country: "Canada", slug: "toronto" },
  { name: "Montreal", lat: 45.5017, lon: -73.5673, country: "Canada", slug: "montreal" },
  { name: "Vancouver", lat: 49.2827, lon: -123.1207, country: "Canada", slug: "vancouver" },
  { name: "Calgary", lat: 51.0447, lon: -114.0719, country: "Canada", slug: "calgary" },
  { name: "Edmonton", lat: 53.5461, lon: -113.4938, country: "Canada", slug: "edmonton" },
  { name: "Ottawa", lat: 45.4215, lon: -75.6972, country: "Canada", slug: "ottawa" },
  { name: "Winnipeg", lat: 49.8951, lon: -97.1384, country: "Canada", slug: "winnipeg" },
  { name: "Quebec City", lat: 46.8139, lon: -71.208, country: "Canada", slug: "quebec-city" },
  { name: "Hamilton, Ontario", lat: 43.2557, lon: -79.8711, country: "Canada", slug: "hamilton-ontario" },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332, country: "Mexico", slug: "mexico-city" },
  { name: "Guadalajara", lat: 20.6597, lon: -103.3496, country: "Mexico", slug: "guadalajara" },
  { name: "Monterrey", lat: 25.6866, lon: -100.3161, country: "Mexico", slug: "monterrey" },
  { name: "Puebla", lat: 19.0414, lon: -98.2063, country: "Mexico", slug: "puebla" },
  { name: "Tijuana", lat: 32.5149, lon: -117.0382, country: "Mexico", slug: "tijuana" },

  // South America
  { name: "São Paulo", lat: -23.5505, lon: -46.6333, country: "Brazil", slug: "sao-paulo" },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, country: "Brazil", slug: "rio-de-janeiro" },
  { name: "Brasília", lat: -15.8267, lon: -47.9218, country: "Brazil", slug: "brasilia" },
  { name: "Salvador, Bahia", lat: -12.9714, lon: -38.5014, country: "Brazil", slug: "salvador-bahia" },
  { name: "Fortaleza", lat: -3.7319, lon: -38.5267, country: "Brazil", slug: "fortaleza" },
  { name: "Belo Horizonte", lat: -19.9191, lon: -43.9386, country: "Brazil", slug: "belo-horizonte" },
  { name: "Manaus", lat: -3.119, lon: -60.0217, country: "Brazil", slug: "manaus" },
  { name: "Curitiba", lat: -25.4284, lon: -49.2733, country: "Brazil", slug: "curitiba" },
  { name: "Recife", lat: -8.0476, lon: -34.877, country: "Brazil", slug: "recife" },
  { name: "Buenos Aires", lat: -34.6118, lon: -58.396, country: "Argentina", slug: "buenos-aires" },
  { name: "Córdoba, Argentina", lat: -31.4201, lon: -64.1888, country: "Argentina", slug: "cordoba-argentina" },
  { name: "Rosario", lat: -32.9442, lon: -60.6505, country: "Argentina", slug: "rosario" },
  { name: "Lima", lat: -12.0464, lon: -77.0428, country: "Peru", slug: "lima" },
  { name: "Bogotá", lat: 4.711, lon: -74.0721, country: "Colombia", slug: "bogota" },
  { name: "Medellín", lat: 6.2442, lon: -75.5812, country: "Colombia", slug: "medellin" },
  { name: "Cali", lat: 3.4516, lon: -76.532, country: "Colombia", slug: "cali" },
  { name: "Santiago", lat: -33.4489, lon: -70.6693, country: "Chile", slug: "santiago" },
  { name: "Caracas", lat: 10.4806, lon: -66.9036, country: "Venezuela", slug: "caracas" },
  { name: "Quito", lat: -0.1807, lon: -78.4678, country: "Ecuador", slug: "quito" },
  { name: "La Paz", lat: -16.5, lon: -68.1193, country: "Bolivia", slug: "la-paz" },
  { name: "Montevideo", lat: -34.9011, lon: -56.1645, country: "Uruguay", slug: "montevideo" },

  // Africa
  { name: "Cairo", lat: 30.0444, lon: 31.2357, country: "Egypt", slug: "cairo" },
  { name: "Lagos", lat: 6.5244, lon: 3.3792, country: "Nigeria", slug: "lagos" },
  { name: "Kinshasa", lat: -4.4419, lon: 15.2663, country: "Democratic Republic of Congo", slug: "kinshasa" },
  { name: "Johannesburg", lat: -26.2041, lon: 28.0473, country: "South Africa", slug: "johannesburg" },
  { name: "Luanda", lat: -8.839, lon: 13.2894, country: "Angola", slug: "luanda" },
  { name: "Dar es Salaam", lat: -6.7924, lon: 39.2083, country: "Tanzania", slug: "dar-es-salaam" },
  { name: "Khartoum", lat: 15.5007, lon: 32.5599, country: "Sudan", slug: "khartoum" },
  { name: "Alexandria", lat: 31.2001, lon: 29.9187, country: "Egypt", slug: "alexandria" },
  { name: "Abidjan", lat: 5.36, lon: -4.0083, country: "Ivory Coast", slug: "abidjan" },
  { name: "Kano, Nigeria", lat: 12.0022, lon: 8.592, country: "Nigeria", slug: "kano-nigeria" },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241, country: "South Africa", slug: "cape-town" },
  { name: "Casablanca", lat: 33.5731, lon: -7.5898, country: "Morocco", slug: "casablanca" },
  { name: "Addis Ababa", lat: 9.145, lon: 38.7451, country: "Ethiopia", slug: "addis-ababa" },
  { name: "Nairobi", lat: -1.2921, lon: 36.8219, country: "Kenya", slug: "nairobi" },
  { name: "Accra", lat: 5.6037, lon: -0.187, country: "Ghana", slug: "accra" },

  // Oceania
  { name: "Sydney", lat: -33.8688, lon: 151.2093, country: "Australia", slug: "sydney" },
  { name: "Melbourne", lat: -37.8136, lon: 144.9631, country: "Australia", slug: "melbourne" },
  { name: "Brisbane", lat: -27.4698, lon: 153.0251, country: "Australia", slug: "brisbane" },
  { name: "Perth", lat: -31.9505, lon: 115.8605, country: "Australia", slug: "perth" },
  { name: "Adelaide", lat: -34.9285, lon: 138.6007, country: "Australia", slug: "adelaide" },
  { name: "Gold Coast, Queensland", lat: -28.0167, lon: 153.4, country: "Australia", slug: "gold-coast-queensland" },
  { name: "Newcastle, New South Wales", lat: -32.9283, lon: 151.7817, country: "Australia", slug: "newcastle-new-south-wales" },
  { name: "Canberra", lat: -35.2809, lon: 149.13, country: "Australia", slug: "canberra" },
  { name: "Auckland", lat: -36.8485, lon: 174.7633, country: "New Zealand", slug: "auckland" },
  { name: "Wellington", lat: -41.2865, lon: 174.7762, country: "New Zealand", slug: "wellington" },
  { name: "Christchurch", lat: -43.5321, lon: 172.6362, country: "New Zealand", slug: "christchurch" },

  // Middle East
  { name: "Dubai", lat: 25.2048, lon: 55.2708, country: "United Arab Emirates", slug: "dubai" },
  { name: "Abu Dhabi", lat: 24.4539, lon: 54.3773, country: "United Arab Emirates", slug: "abu-dhabi" },
  { name: "Riyadh", lat: 24.7136, lon: 46.6753, country: "Saudi Arabia", slug: "riyadh" },
  { name: "Jeddah", lat: 21.4858, lon: 39.1925, country: "Saudi Arabia", slug: "jeddah" },
  { name: "Kuwait City", lat: 29.3759, lon: 47.9774, country: "Kuwait", slug: "kuwait-city" },
  { name: "Doha", lat: 25.2854, lon: 51.531, country: "Qatar", slug: "doha" },
  { name: "Manama", lat: 26.0667, lon: 50.5577, country: "Bahrain", slug: "manama" },
  { name: "Muscat", lat: 23.5859, lon: 58.4059, country: "Oman", slug: "muscat" },
  { name: "Beirut", lat: 33.8938, lon: 35.5018, country: "Lebanon", slug: "beirut" },
  { name: "Amman", lat: 31.9454, lon: 35.9284, country: "Jordan", slug: "amman" },
]
async function validateWikipediaEntry(cityName) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`, {
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

async function validateAllCities() {
  console.log(`🔍 Validating ${MAJOR_CITIES.length} cities against Wikipedia API...\n`)

  const results = {
    successful: [],
    failed: [],
    needsAlternative: [],
  }

  // Test cities in batches to avoid rate limiting
  const batchSize = 5
  for (let i = 0; i < MAJOR_CITIES.length; i += batchSize) {
    const batch = MAJOR_CITIES.slice(i, i + batchSize)

    console.log(`Testing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(MAJOR_CITIES.length / batchSize)}...`)

    const batchPromises = batch.map(async (city) => {
      const result = await validateWikipediaEntry(city.name)
      return { city, result }
    })

    const batchResults = await Promise.all(batchPromises)

    for (const { city, result } of batchResults) {
      if (result.success) {
        results.successful.push({
          name: city.name,
          slug: city.slug,
          country: city.country,
          title: result.title,
          hasImage: result.hasImage,
        })
        console.log(`✅ ${city.name} -> "${result.title}"`)
      } else {
        results.failed.push({
          name: city.name,
          slug: city.slug,
          country: city.country,
          error: result.error || `${result.status} ${result.statusText}`,
        })
        console.log(`❌ ${city.name} -> ${result.error || result.status}`)

        // Try alternative names for failed cities
        const alternatives = getAlternativeNames(city.name, city.country)
        for (const alt of alternatives) {
          const altResult = await validateWikipediaEntry(alt)
          if (altResult.success) {
            results.needsAlternative.push({
              original: city.name,
              alternative: alt,
              slug: city.slug,
              country: city.country,
              title: altResult.title,
            })
            console.log(`  💡 Alternative found: "${alt}" -> "${altResult.title}"`)
            break
          }
        }
      }
    }

    // Small delay between batches
    if (i + batchSize < MAJOR_CITIES.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  // Print summary
  console.log(`\n📊 VALIDATION SUMMARY:`)
  console.log(`✅ Successful: ${results.successful.length}`)
  console.log(`❌ Failed: ${results.failed.length}`)
  console.log(`💡 Need alternatives: ${results.needsAlternative.length}`)

  if (results.failed.length > 0) {
    console.log(`\n❌ FAILED CITIES:`)
    results.failed.forEach((city) => {
      console.log(`  - ${city.name} (${city.country}): ${city.error}`)
    })
  }

  if (results.needsAlternative.length > 0) {
    console.log(`\n💡 SUGGESTED ALTERNATIVES:`)
    results.needsAlternative.forEach((city) => {
      console.log(`  - "${city.original}" -> "${city.alternative}" (${city.title})`)
    })
  }

  // Cities without images
  const noImages = results.successful.filter((city) => !city.hasImage)
  if (noImages.length > 0) {
    console.log(`\n🖼️  CITIES WITHOUT IMAGES (${noImages.length}):`)
    noImages.forEach((city) => {
      console.log(`  - ${city.name}`)
    })
  }

  return results
}

function getAlternativeNames(cityName, country) {
  const alternatives = []

  // Common alternative patterns
  const alternativeMap = {
    "New York": ["New York City"],
    "Washington DC": ["Washington, D.C.", "Washington (state)"],
    "Mexico City": ["Mexico City, Mexico"],
    "Quebec City": ["Quebec City, Quebec", "Quebec"],
    "Kuwait City": ["Kuwait City, Kuwait", "Kuwait"],
    "Ho Chi Minh City": ["Ho Chi Minh City, Vietnam", "Saigon"],
    "São Paulo": ["São Paulo, Brazil", "Sao Paulo"],
    "Rio de Janeiro": ["Rio de Janeiro, Brazil"],
    Córdoba: ["Córdoba, Argentina"],
    "Saint Petersburg": ["Saint Petersburg, Russia", "St. Petersburg"],
    "Tel Aviv": ["Tel Aviv-Yafo"],
    "Dar es Salaam": ["Dar es Salaam, Tanzania"],
    "Addis Ababa": ["Addis Ababa, Ethiopia"],
    "Cape Town": ["Cape Town, South Africa"],
    "Gold Coast": ["Gold Coast, Queensland"],
    Newcastle: ["Newcastle, New South Wales"],
    Hamilton: ["Hamilton, Ontario"],
    Columbus: ["Columbus, Ohio"],
    Portland: ["Portland, Oregon"],
    Frankfurt: ["Frankfurt am Main"],
    Kiev: ["Kyiv"],
    Bangalore: ["Bengaluru"],
    Bombay: ["Mumbai"],
    Calcutta: ["Kolkata"],
  }

  if (alternativeMap[cityName]) {
    alternatives.push(...alternativeMap[cityName])
  }

  // Add country suffix for disambiguation
  if (!cityName.includes(country)) {
    alternatives.push(`${cityName}, ${country}`)
  }

  return alternatives
}

// Run the validation
validateAllCities().catch(console.error)

