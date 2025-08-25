import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PrintPack() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader><CardTitle>Printable Pack 🖨️</CardTitle></CardHeader>
      <CardContent>
        <p className="mb-4">Download worksheets and offline activities.</p>
        <Button>Download PDF Pack</Button>
      </CardContent>
    </Card>
  )
}