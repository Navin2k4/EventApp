'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { eventFormSchema } from "@/lib/validator"
import { z } from "zod"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventDefaultValues } from "@/constants"
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import { Checkbox } from "../ui/checkbox"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.action"
import { IEvent } from "@/lib/database/models/event.model"

type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  
  const initialValues = event && type === 'Update' 
    ? { 
      ...event, 
      startDateTime: new Date(event.startDateTime), 
      endDateTime: new Date(event.endDateTime),
      coordinators: event.coordinators || []
    }
    : { ...eventDefaultValues, coordinators: [] }

  const { startUpload } = useUploadThing('imageUploader')
  const router = useRouter()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "coordinators"
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl
    if (files.length > 0) {
      const uploadedImages = await startUpload(files)
      if (!uploadedImages) {
        return
      }
      uploadedImageUrl = uploadedImages[0].url
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })
        if (newEvent) {
          form.reset()
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (type === 'Update') {
      if (!eventId) {
        router.back()
        return
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if (updatedEvent) {
          form.reset()
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        <div className="space-y-8 bg-white shadow-lg rounded-xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800">Event Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization/College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization or college name" {...field} className="input-field" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter department name" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your event"
                    {...field}
                    className="textarea resize-none h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-10 w-full overflow-hidden rounded-md bg-gray-100 px-3">
                      <Image src="/assets/icons/location-grey.svg" alt="location" height={20} width={20} />
                      <Input
                        placeholder="Event location or Online"
                        {...field}
                        className="border-0 bg-transparent outline-none focus:ring-0 text-sm ml-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationGoogleMapsUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps Link (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-10 w-full overflow-hidden rounded-md bg-gray-100 px-3">
                      <Image src="/assets/icons/link.svg" alt="link" height={20} width={20} />
                      <Input
                        placeholder="Google Maps URL"
                        {...field}
                        className="border-0 bg-transparent outline-none focus:ring-0 text-sm ml-2"
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Image</FormLabel>
                <FormControl>
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

        <div className="space-y-8 bg-white shadow-lg rounded-xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800">Date and Time</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date & Time</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-10 w-full overflow-hidden rounded-md bg-gray-100 px-3">
                      <Image src="/assets/icons/calendar.svg" alt="calendar" width={20} height={20} />
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="border-0 bg-transparent outline-none focus:ring-0 text-sm ml-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date & Time</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-10 w-full overflow-hidden rounded-md bg-gray-100 px-3">
                      <Image src="/assets/icons/calendar.svg" alt="calendar" width={20} height={20} />
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="border-0 bg-transparent outline-none focus:ring-0 text-sm ml-2"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-8 bg-white shadow-lg rounded-xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800">Pricing</h2>
          
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center h-10 w-full overflow-hidden rounded-md bg-gray-100 px-3">
                      <Image src="/assets/icons/dollar.svg" alt="dollar" width={20} height={20} />
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        className="border-0 bg-transparent outline-none focus:ring-0 text-sm ml-2"
                        disabled={form.watch("isFree")}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Free Event</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-8 bg-white shadow-lg rounded-xl p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800">Coordinators</h2>
          
          <FormField
            control={form.control}
            name="numCoordinators"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Coordinators</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      field.onChange(value)
                      const currentLength = fields.length
                      if (value > currentLength) {
                        for (let i = currentLength; i < value; i++) {
                          append({ name: '', phoneNumber: '' })
                        }
                      } else if (value < currentLength) {
                        for (let i = currentLength - 1; i >= value; i--) {
                          remove(i)
                        }
                      }
                    }}
                    min={0}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`coordinators.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordinator Name {index+1}</FormLabel>
                    <FormControl>
                      <Input {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`coordinators.${index}.phoneNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordinator {index+1} Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full py-3 font-semibold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  )
}

export default EventForm