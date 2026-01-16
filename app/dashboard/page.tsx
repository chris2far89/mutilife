import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import DashboardClient from './DashboardClient'

export default function DashboardPage() {
  if (!isAuthenticated()) {
    redirect('/')
  }

  return <DashboardClient />
}
