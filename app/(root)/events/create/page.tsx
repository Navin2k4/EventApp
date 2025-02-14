import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs";
import { Sparkles, ArrowRight } from "lucide-react";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <div className="min-h-screen bg-[#0f1014]">
      {/* Hero Banner */}
      <div className="relative h-[250px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e41312]/20 to-[#1e1f23] z-0" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30" />
        
        <div className="relative z-10 h-full flex flex-col justify-center wrapper">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Create an <span className="text-[#e41312]">Event</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Turn your vision into reality. Create an unforgettable experience.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="wrapper py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Form Section - Takes up more space */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="border-b border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white">Event Details</h2>
                <p className="text-gray-400 mt-1">Fill in the information below to create your event</p>
              </div>
              <div className="p-6">
                <EventForm userId={userId} type="Create" />
              </div>
            </div>
          </div>

          {/* Sidebar - Takes up less space */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guidelines Card */}
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-[#e41312]/10">
                  <Sparkles className="w-5 h-5 text-[#e41312]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Event Guidelines</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Essential Details</h4>
                  <ul className="space-y-3">
                    {[
                      "Choose a clear, descriptive title",
                      "Add high-quality event images",
                      "Provide accurate location details"
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                        <ArrowRight className="w-4 h-4 text-[#e41312] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Timing & Capacity</h4>
                  <ul className="space-y-3">
                    {[
                      "Set realistic start and end times",
                      "Include registration deadlines",
                      "Consider your venue capacity"
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                        <ArrowRight className="w-4 h-4 text-[#e41312] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Additional Tips</h4>
                  <ul className="space-y-3">
                    {[
                      "Add event coordinators for support",
                      "Include relevant event links",
                      "Double-check all information"
                    ].map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                        <ArrowRight className="w-4 h-4 text-[#e41312] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent