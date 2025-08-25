import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress as ProgressBar } from "@/components/ui/progress"

export default function Progress() {
  const progress = 60 // demo percentage

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle>Progress Report 📊</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">Overall stars earned: ⭐⭐⭐⭐</p>
        <ProgressBar value={progress} className="h-4" />
        <p className="mt-2 text-sm text-gray-600">{progress}% complete</p>
      </CardContent>
    </Card>
  )
}