// Test cohort detection - you can customize this logic
export function isInTestCohort(): boolean {
  // Option 1: URL parameter
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("test") === "images") return true
  }

  // Option 2: Random percentage (10% of users)
  // return Math.random() < 0.1

  // Option 3: Specific user agent or other criteria
  // if (typeof window !== 'undefined') {
  //   return window.navigator.userAgent.includes('Chrome')
  // }

  // For demo purposes, let's use URL parameter
  return false
}

export function isInTestCohortServer(searchParams: URLSearchParams): boolean {
  return searchParams.get("test") === "images"
}
