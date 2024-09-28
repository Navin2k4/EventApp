"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";
const content = [
  {
    title: "Interactive Workshops",
    description:
      "Join our hands-on workshops designed to enhance your skills and knowledge. From creative arts to technical skills, our workshops offer practical experience that complements your academic learning. Engage with industry professionals and gain insights that will benefit your career.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://images.pexels.com/photos/716281/pexels-photo-716281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Workshop"
        />
      </div>
    ),
  },
  {
    title: "Networking Events",
    description:
      "Expand your professional network by attending our networking events. Connect with peers, alumni, and industry leaders in a friendly atmosphere. These events are designed to foster relationships and create opportunities for internships and job placements.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://images.pexels.com/photos/3700250/pexels-photo-3700250.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Networking Event"
        />
      </div>
    ),
  },
  {
    title: "Cultural Festivals",
    description:
      "Experience the vibrant diversity of our campus at our cultural festivals. Celebrate different cultures through food, music, and performances. These events provide a platform for students to showcase their heritage and foster inclusivity.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://images.pexels.com/photos/28581340/pexels-photo-28581340/free-photo-of-vibrant-nightlife-concert-scene-with-mobile-capture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Cultural Festival"
        />
      </div>
    ),
  },
  {
    title: "Guest Speaker Series",
    description:
      "Learn from the best in the field by attending our guest speaker series. Renowned professionals share their experiences and insights, providing valuable knowledge and inspiration. These sessions are great opportunities for students to engage with experts and ask questions.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Guest Speaker"
        />
      </div>
    ),
  },
];

  
export function StickyScrollRevealDemo() {
  return (
    <div className="">
      <StickyScroll content={content} />
    </div>
  );
}
