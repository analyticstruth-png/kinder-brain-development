import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const weeks = [
  { week: 1, focus: "Memory & Attention", activity: "Memory Match" },
  { week: 2, focus: "Counting & Inhibition", activity: "Quick Count" },
  { week: 3, focus: "Sequencing", activity: "Story Steps" },
  { week: 4, focus: "Pattern Recognition", activity: "Shape Patterns" },
  { week: 5, focus: "Emotional Cognition", activity: "Feelings Match" },
  { week: 6, focus: "Working Memory", activity: "N-Back Lite" },
  { week: 7, focus: "Spatial Awareness", activity: "Puzzle Fit" },
  { week: 8, focus: "Attention Control", activity: "Red Light, Green Light" },
  { week: 9, focus: "Problem Solving", activity: "Shape Sorter" },
  { week: 10, focus: "Categorization", activity: "Odd One Out" },
  { week: 11, focus: "Verbal Memory", activity: "Rhyme Match" },
  { week: 12, focus: "Integration Week", activity: "Mixed Review" },
]

export default function Program() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {weeks.map((w) => (
        <Card key={w.week} className="rounded-2xl shadow-md hover:shadow-lg">
          <CardHeader>
            <CardTitle>Week {w.week}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-semibold">Focus:</span> {w.focus}</p>
            <p><span className="font-semibold">Activity:</span> {w.activity}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}