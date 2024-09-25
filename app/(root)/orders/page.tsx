import { formatDateTime, formatPrice } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import { getOrdersByEvent } from '@/lib/actions/order.action'
import Search from '@/components/shared/Search'
import { DataTableDemo } from './DataTableDemo'
import TotalRevenueCard from '@/components/shared/TotalRevenueCard'

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || ''
  const searchText = (searchParams?.query as string) || ''

  const orders = await getOrdersByEvent({ eventId, searchString: searchText })
  console.log(orders);
  
  return (
    <div className='bg-[#1e1f23]'>
      <section className=" bg-[#1e1f23] bg-dotted-pattern bg-cover bg-center py-3 md:py-6">
        <h3 className="wrapper h3-bold text-center text-[#e41312] sm:text-left tracking-widest overline">Bookings Made</h3>
      </section>

      <section className="wrapper">
        <Search placeholder='Search by Name or Email...' />
      </section>

      <section className="wrapper overflow-x-auto bg-[#1e1f23] ">
      <h3 className="h4-medium mb-4 text-center text-[#e41312] sm:text-left tracking-widest">Orders</h3>
        <DataTableDemo data={orders} />
      </section>
      <section className="wrapper ">
      <h3 className="h4-medium mb-4 text-center text-[#e41312] sm:text-left tracking-widest">Revenue</h3>
        <TotalRevenueCard orders={orders} />
      </section>

    </div>
  )
}

export default Orders