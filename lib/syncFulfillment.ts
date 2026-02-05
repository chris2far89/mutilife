import { supabaseServer } from '@/lib/supabaseServer'

export async function syncFulfillmentStatus() {
  try {
    const { data: orders, error } = await supabaseServer
      .from('orders_tracking')
      .select('id, waybill_no')
      .not('waybill_no', 'is', null)

    if (error) throw error

    const bearerToken = process.env.PUDO_API_TOKEN
    if (!bearerToken) {
      console.error('PUDO_API_TOKEN not configured')
      return
    }

    for (const order of orders || []) {
      try {
        const res = await fetch(
          `https://api-pudo.co.za/api/v1/tracking/shipments/public?waybill=${order.waybill_no}`,
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`
            }
          }
        )

        if (!res.ok) continue

        const data = await res.json()
        if (data && data.length > 0) {
          const status = data[0].status

          await supabaseServer
            .from('orders_tracking')
            .update({
              fulfillment_status: status,
              updated_at: new Date().toISOString()
            })
            .eq('id', order.id)
        }
      } catch (error) {
        console.error(`Failed to sync waybill ${order.waybill_no}:`, error)
      }
    }
  } catch (error) {
    console.error('Fulfillment sync error:', error)
  }
}

if (process.env.NODE_ENV === 'production') {
  setInterval(syncFulfillmentStatus, 30 * 60 * 1000)
}
