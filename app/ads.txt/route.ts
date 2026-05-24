import { NextResponse } from 'next/server'

export function GET() {
  const publisherId = process.env.GOOGLE_ADSENSE_PUBLISHER_ID

  if (!publisherId) {
    return new NextResponse('ads.txt is not configured yet.\n', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }

  return new NextResponse(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
