import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <div className="bg-[#1e1f23] pb-8">
      <section className="bg-dotted-pattern bg-cover bg-center pt-24 py-2">
        <h3 className="wrapper h3-bold tracking-widest text-center text-[#e41312] sm:text-left">Create Your Event</h3>
      </section>

      <div className="wrapper mt-8 ">
        <EventForm userId={userId} type="Create" />
      </div>
    </div>
  )
}

export default CreateEvent