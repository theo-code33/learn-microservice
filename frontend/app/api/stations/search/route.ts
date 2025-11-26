import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    return Response.json({ detail: 'unauthorized' }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const address = searchParams.get('address')
  const wishes = searchParams.get('wishes') || 'rent'

  if(!address) {
    return Response.json({ detail: 'address query parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${process.env.STATIONS_SERVICE_URL || 'http://localhost:4001/api/stations'}/search?address=${encodeURIComponent(address)}&wishes=${wishes}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    
    
    const json = await response.json()
    return Response.json(json, { status: response.status })  
  } catch (error) {
    console.error(error);
    return Response.json({ detail: 'stations service unreachable' }, { status: 503 })
  }

}