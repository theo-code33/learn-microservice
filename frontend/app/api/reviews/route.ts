import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies()

  try {
    const body = await request.json()

    const data = await fetch(
      `${process.env.REVIEW_SERVICE_URL || 'http://localhost:4001/api/reviews'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookieStore.get('access_token')?.value || ''}`
        },
        body: JSON.stringify(body),
      }
    )

    if (!data.ok) {
      const err = await data.json().catch(() => ({}))
      return Response.json(
        { detail: err.detail || 'Failed to submit review' },
        { status: data.status }
      )
    }

    const result = await data.json()
    return Response.json(result)
  } catch (error) {
    return Response.json({ detail: 'Failed to submit review' }, { status: 500 })
  }
}