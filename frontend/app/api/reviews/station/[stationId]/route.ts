import { Review } from "@/types/review"

export async function GET(request: Request, { params }: { params: { stationId: string } }) {
  try {
    const data = await fetch(
      `${process.env.REVIEW_SERVICE_URL || 'http://localhost:4001/api/reviews'}/station/${params.stationId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!data.ok) {
      const err = await data.json().catch(() => ({}))
      return Response.json(
        { detail: err.detail || 'Failed to fetch reviews' },
        { status: data.status }
      )
    }

    const result = await data.json() as Review[]
    return Response.json(result)
  } catch (error) {
    return Response.json({ detail: 'Failed to fetch reviews' }, { status: 500 })
  }
}