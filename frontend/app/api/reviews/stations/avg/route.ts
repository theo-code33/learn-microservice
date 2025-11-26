export async function GET() {
  try {
    const data = await fetch(
      `${process.env.REVIEW_SERVICE_URL || 'http://localhost:4001/api/reviews'}/stations/avg/`,
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

    const result = await data.json() as {
      stationId: string;
      averageRating: number;
    }[]
    return Response.json(result)
  } catch (error) {
    return Response.json({ detail: 'Failed to fetch reviews' }, { status: 500 })
  }
}