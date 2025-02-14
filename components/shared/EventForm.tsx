"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventFormSchema } from "@/lib/validator";
import { z } from "zod";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventDefaultValues } from "@/constants";
import DropDown from "./DropDown";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.action";
import { IEvent } from "@/lib/database/models/event.model";
import {
  Calendar,
  Link,
  Locate,
  LucideIndianRupee,
  Map,
  Plus,
  Trash2,
  UserPlus2,
  Users,
  MapPin,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import CustomDateTimePicker from "./CustomDateTimePicker";

// Animation variants
const variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {

  const [files, setFiles] = useState<File[]>([]);

  const [showCoordinators, setShowCoordinators] = useState(false);
  const [coordinators, setCoordinators] = useState([
    { name: "", email: "", phone: "" },
  ]); // Default state
  const handleDeleteCoordinator = (index: any) => {
    setCoordinators((prevCoordinators) =>
      prevCoordinators.filter((_, i) => i !== index)
    );
  };

  const initialValues =
    event && type === "Update"
      ? {
        ...event,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
        registrationEndDate: event.registrationEndDate
          ? new Date(event.registrationEndDate)
          : undefined,
      }
      : eventDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    const eventCapacity =
      values.eventCapacity && !isNaN(values.eventCapacity)
        ? Number(values.eventCapacity)
        : undefined;

    const coordinators = values.coordinators || [];
    const updatedValues = {
      ...values,
      eventCapacity,
      coordinators: showCoordinators
        ? coordinators.map((coordinator) => ({
          name: coordinator.name || "",
          email: coordinator.email || "",
          phone: coordinator.phone || "",
        }))
        : [], // Use an empty array if toggled off
    };

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: {
            ...updatedValues,
            eventCapacity,
            imageUrl: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...updatedValues, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DropDown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Location Section */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-2 rounded-lg bg-[#e41312]/10">
              <MapPin className="w-5 h-5 text-[#e41312]" />
            </div>
            <h3 className="text-xl font-semibold text-white">Location Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Venue Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Locate className="absolute left-4 top-3.5 text-gray-400" />
                      <Input
                        placeholder="Enter physical location or 'Online'"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl pl-12 focus:border-[#e41312]/50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mapLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Map URL (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Map className="absolute left-4 top-3.5 text-gray-400" />
                      <Input
                        placeholder="Google Maps or other map service URL"
                        {...field}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl pl-12 focus:border-[#e41312]/50"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-gray-400">
                    Add a map link to help attendees find your venue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </motion.div>

        {/* Date and Time Section */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-2 rounded-lg bg-[#e41312]/10">
              <Calendar className="w-5 h-5 text-[#e41312]" />
            </div>
            <h3 className="text-xl font-semibold text-white">Date & Time</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white mb-2">Start Date & Time</FormLabel>
                  <FormControl>
                    <CustomDateTimePicker
                      selected={field.value || null}
                      onChange={(date) => {
                        field.onChange(date);
                        // If end date is not set or is before start date, update it
                        const endDate = form.getValues("endDateTime");
                        if (date && (!endDate || endDate < date)) {
                          const newEndDate = new Date(date);
                          newEndDate.setHours(date.getHours() + 1);
                          form.setValue("endDateTime", newEndDate);
                        }
                      }}
                      minDate={new Date()}
                      placeholderText="Select start date and time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white mb-2">End Date & Time</FormLabel>
                  <FormControl>
                    <CustomDateTimePicker
                      selected={field.value || null}
                      onChange={(date) => {
                        if (date) {
                          const startDate = form.getValues("startDateTime");
                          if (startDate && date < startDate) {
                            form.setError("endDateTime", {
                              type: "manual",
                              message: "End date must be after start date"
                            });
                          } else {
                            field.onChange(date);
                            form.clearErrors("endDateTime");
                          }
                        }
                      }}
                      minDate={form.getValues("startDateTime") || new Date()}
                      placeholderText="Select end date and time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4 border-t border-white/10">
            <FormField
              control={form.control}
              name="registrationEndDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white mb-2">Registration Deadline</FormLabel>
                  <FormControl>
                    <CustomDateTimePicker
                      selected={field.value || null}
                      onChange={(date) => {
                        if (date) {
                          const startDate = form.getValues("startDateTime");
                          if (startDate && date > startDate) {
                            form.setError("registrationEndDate", {
                              type: "manual",
                              message: "Registration deadline must be before event start"
                            });
                          } else {
                            field.onChange(date);
                            form.clearErrors("registrationEndDate");
                          }
                        }
                      }}
                      maxDate={form.getValues("startDateTime") || undefined}
                      placeholderText="Select registration deadline (Optional)"
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400">
                    Set a deadline for event registration. Must be before the event starts.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </motion.div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <LucideIndianRupee />
                    <Input
                      type="number"
                      placeholder="Price per person"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled={form.watch("isFree")}
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field: isFreeField }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={isFreeField.onChange}
                                checked={isFreeField.value}
                                id="isFree"
                                className="mr-2 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventCapacity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Users />
                    <Input
                      type="number" // Change to type="number" for numeric input
                      placeholder="Event Capacity (Optional)"
                      {...field}
                      className="input-field"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                      value={field.value || ""}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                  <Link />
                  <Input placeholder="URL" {...field} className="input-field" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-center items-center gap-2 h-[54px] w-full overflow-hidden rounded-full text-white px-4 py-2">
          <UserPlus2 className="mr-2" />
          <label htmlFor="showCoordinators" className="mr-4 text-white">
            Include Coordinators
          </label>
          <Switch
            id="showCoordinators"
            className="h-6 w-11"
            checked={showCoordinators}
            onCheckedChange={() => setShowCoordinators(!showCoordinators)}
          />
          <Button
            variant={"outline"}
            type="button"
            onClick={() =>
              setCoordinators([
                ...coordinators,
                { name: "", email: "", phone: "" },
              ])
            }
            className="ml-4 font-semibold text-white rounded-l-full rounded-tr-lg hover:text-white hover:bg-black"
          >
            Add Coordinator
            <Plus className="ml-2" />
          </Button>
        </div>

        <motion.div
          initial="hidden"
          animate={showCoordinators ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {coordinators.map((_, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mb-4 flex flex-col items-center gap-5 md:flex-row"
            >
              <FormField
                control={form.control}
                name={`coordinators.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Coordinator Name"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`coordinators.${index}.email`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Coordinator Email"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`coordinators.${index}.phone`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Coordinator Phone"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => handleDeleteCoordinator(index)}
                className="self-center bg-transparent border border-red-500 p-3 hover:bg-black hover:text-white hover:border-white transition-all duration-200 text-red-500 rounded-full"
              >
                <Trash2 height={20} width={20} />
              </button>
            </motion.div>
          ))}
        </motion.div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 bg-[#e41312] hover:bg-[#c00303] w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
