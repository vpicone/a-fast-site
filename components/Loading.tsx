import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export async function Loading() {
  return (
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
  )
}