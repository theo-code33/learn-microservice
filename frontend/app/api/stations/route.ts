import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    return Response.json({ detail: 'unauthorized' }, { status: 401 })
  }

  try {
  const response = await fetch(
    `${process.env.STATIONS_SERVICE_URL || 'http://localhost:4001/api/stations'}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const json = await response.json().catch(() => ({}))
  return Response.json(json, { status: response.status })  
  } catch (error) {
    return Response.json({ detail: 'stations service unreachable' }, { status: 503 })
  }
}