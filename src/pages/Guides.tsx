import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Guides() {
  return (
    <div className="space-y-4">
      <Card className="rounded-2xl shadow-md">
        <CardHeader><CardTitle>How to Use Cognition Sprouts 🌱</CardTitle></CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Pick the week's focus from the Program tab.</li>
            <li>Open the matching activity in the Activities tab.</li>
            <li>Guide the child step-by-step. Give hints, but let them think!</li>
            <li>After play, check progress in the Progress tab.</li>
            <li>Encourage practice 10–15 min/day.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}