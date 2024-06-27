import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <div className="bg-[#c8c8c8] pb-8">
      <section className="bg-[#c8c8c8] bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold tracking-widest text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper mt-8 ">
        <EventForm userId={userId} type="Create" />
      </div>
    </div>
  )
}

export default CreateEvent