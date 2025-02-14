import { SearchParamProps } from '@/types'
import { getOrdersByEvent } from '@/lib/actions/order.action'
import Search from '@/components/shared/Search'
import { DataTableDemo } from './DataTableDemo'
import TotalRevenueCard from '@/components/shared/TotalRevenueCard'
import { BarChart3, FileText, Search as SearchIcon } from 'lucide-react'

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || ''
  const searchText = (searchParams?.query as string) || ''

  const orders = await getOrdersByEvent({ eventId, searchString: searchText })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1014] to-[#1e1f23]">
      {/* Header Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-[#e41312]/5" />
        <div className="wrapper relative">
          <h1 className="text-4xl font-bold text-white mb-4">
            Event <span className="text-[#e41312]">Bookings</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Track and manage all your event bookings and revenue in one place.
          </p>
        </div>
      </section>

      <div className="wrapper pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#e41312]/10">
                  <SearchIcon className="w-5 h-5 text-[#e41312]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Search Orders</h2>
              </div>
              <Search placeholder="Search by name or email..." />
            </div>

            {/* Orders Table */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#e41312]/10">
                    <FileText className="w-5 h-5 text-[#e41312]" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Orders List</h2>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
                  {orders.length} orders
                </div>
              </div>
              <DataTableDemo data={orders} />
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="space-y-8">
            {/* Revenue Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#e41312]/10">
                  <BarChart3 className="w-5 h-5 text-[#e41312]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Revenue</h2>
              </div>
              <TotalRevenueCard orders={orders} />
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#e41312]/10 to-transparent backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {[
                  {
                    label: 'Total Orders',
                    value: orders.length,
                  },
                  {
                    label: 'Paid Orders',
                    value: orders.filter((order: any) => !order.isFree).length,
                  },
                  {
                    label: 'Free Orders',
                    value: orders.filter((order: any) => order.isFree).length,
                  }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                  >
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="text-white font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders