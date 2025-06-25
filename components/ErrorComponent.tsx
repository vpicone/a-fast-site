"use client"

export default function ErrorComponent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <h1 className="text-center text-5xl md:text-7xl font-bold mb-12 leading-none tracking-tight">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Error
          </span>
        </h1>
      </main>
    </div>
  )
}
