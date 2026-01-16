import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const orderNumber = searchParams.get('order_number')

  if (!orderNumber) {
    return NextResponse.json({ error: 'order_number is required' }, { status: 400 })
  }

  try {
    const shop = process.env.SHOPIFY_SHOP || 'cbytxg-7d.myshopify.com'
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN
    const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-10'

    if (!accessToken) {
      throw new Error('SHOPIFY_ACCESS_TOKEN not configured')
    }

    const url = `https://${shop}/admin/api/${apiVersion}/orders.json?name=${encodeURIComponent(orderNumber)}&status=any`

    const res = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Accept': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.status}`)
    }

    const data = await res.json()
    const orders = data.orders || []

    if (orders.length === 0) {
      return NextResponse.json({ order: null, message: 'Order not found' })
    }

    return NextResponse.json({ order: orders[0] })
  } catch (error) {
    console.error('Shopify API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Shopify order' },
      { status: 500 }
    )
  }
}
