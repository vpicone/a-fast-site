import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-40 bg-zinc-800" />
            <Skeleton className="h-10 w-32 bg-zinc-800" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Dynamic Content Banner */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <Skeleton className="h-6 w-48 bg-zinc-800" />
                <Skeleton className="h-6 w-32 bg-zinc-800" />
              </div>
              <Skeleton className="h-4 w-20 bg-zinc-800" />
            </div>
          </div>

          {/* Hero Section Loading */}
          <div className="text-center mb-12">
            <Skeleton className="h-20 w-96 mx-auto mb-6 bg-zinc-800" />
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          {/* City Information Card Loading */}
          <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-blue-400/50 rounded"></div>
                </div>
                <Skeleton className="h-8 w-48 bg-zinc-800" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <Skeleton className="h-48 w-full rounded-xl bg-zinc-800" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Skeleton className="h-8 w-64 bg-zinc-800" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <Skeleton className="h-4 w-32 mb-2 bg-zinc-700" />
                    <Skeleton className="h-6 w-48 bg-zinc-700" />
                  </div>
                  <Skeleton className="h-4 w-56 bg-zinc-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ISS Tracking Card Loading */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10 border border-blue-500/20 rounded-3xl p-8 mb-12 backdrop-blur-sm">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-32 h-32 border border-blue-500/20 rounded-full"></div>
              <div className="absolute top-8 left-8 w-24 h-24 border border-purple-500/20 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-40 h-40 border border-cyan-500/20 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 border border-blue-500/20 rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Header Loading */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <div className="w-8 h-8 bg-white/50 rounded"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-black"></div>
                  </div>
                  <div>
                    <Skeleton className="h-8 w-80 mb-2 bg-zinc-800" />
                    <Skeleton className="h-4 w-48 bg-zinc-800" />
                  </div>
                </div>
              </div>

              {/* Main Content Grid Loading */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* ISS Position Loading */}
                <div className="lg:col-span-1">
                  <div className="bg-black/20 border border-zinc-800 rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-400/50 rounded"></div>
                      </div>
                      <Skeleton className="h-6 w-40 bg-zinc-800" />
                    </div>

                    <div className="space-y-4">
                      <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                        <div className="flex justify-between items-center mb-2">
                          <Skeleton className="h-3 w-20 bg-zinc-700" />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        </div>
                        <Skeleton className="h-8 w-24 bg-zinc-700" />
                      </div>

                      <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                        <div className="flex justify-between items-center mb-2">
                          <Skeleton className="h-3 w-24 bg-zinc-700" />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        </div>
                        <Skeleton className="h-8 w-28 bg-zinc-700" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distance & Status Loading */}
                <div className="lg:col-span-1">
                  <div className="bg-black/20 border border-zinc-800 rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-purple-400/50 rounded"></div>
                      </div>
                      <Skeleton className="h-6 w-48 bg-zinc-800" />
                    </div>

                    <div className="text-center mb-6">
                      <Skeleton className="h-16 w-24 mx-auto mb-2 bg-zinc-800" />
                      <Skeleton className="h-5 w-32 mx-auto bg-zinc-800" />
                    </div>

                    <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-4 text-center">
                      <Skeleton className="h-5 w-40 mx-auto mb-2 bg-zinc-700" />
                      <Skeleton className="h-4 w-56 mx-auto bg-zinc-700" />
                    </div>
                  </div>
                </div>

                {/* ISS Stats Loading */}
                <div className="lg:col-span-1">
                  <div className="bg-black/20 border border-zinc-800 rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-cyan-400/50 rounded"></div>
                      </div>
                      <Skeleton className="h-6 w-32 bg-zinc-800" />
                    </div>

                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-zinc-900/30 rounded-lg">
                          <Skeleton className="h-4 w-24 bg-zinc-700" />
                          <Skeleton className="h-4 w-20 bg-zinc-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Status Loading */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3 bg-black/30 border border-zinc-800 rounded-full px-6 py-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <Skeleton className="h-4 w-48 bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section Loading */}
          <div className="text-center">
            <Skeleton className="h-10 w-80 mx-auto mb-4 bg-zinc-800" />
            <Skeleton className="h-6 w-96 mx-auto mb-8 bg-zinc-800" />
            <Skeleton className="h-14 w-64 mx-auto bg-zinc-800 rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  )
}
