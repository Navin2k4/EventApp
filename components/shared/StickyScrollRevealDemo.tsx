"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";
const content = [
    {
      title: "Expert Turf Maintenance",
      description:
        "Trust our expert team for comprehensive turf maintenance services. We offer regular mowing, fertilization, weed control, and irrigation management to ensure your turf remains lush and healthy year-round. Our tailored maintenance plans cater to residential and commercial properties, keeping your turf in optimal condition.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
              <Image
                src="/assets/images/maintainance.jpg"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt="linear board demo"
              />
            </div>
          ),
    },
    {
      title: "State-of-the-Art Facilities",
      description:
        "Experience our state-of-the-art facilities designed for turf care and management. Our facilities include modern equipment for turf installation, maintenance, and repairs. We prioritize efficiency and quality in every aspect of turf management, ensuring top-notch results for all our clients.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
              <Image
                src="/assets/images/facilities.jpg"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt="linear board demo"
              />
            </div>
          ),
    },
    {
      title: "Professional Turf Care Services",
      description:
        "Benefit from professional turf care services tailored to your specific needs. Whether you require turf installation, renovation, or ongoing care, our team delivers exceptional service with attention to detail. We combine expertise with dedication to enhance the beauty and functionality of your turf.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
              <Image
                src="/assets/images/service.jpg"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt="linear board demo"
              />
            </div>
          ),
    },
    {
      title: "Advanced Turf Solutions",
      description:
        "Discover advanced turf solutions that meet the highest standards of performance and sustainability. Our innovative approach includes eco-friendly turf products and practices that promote environmental responsibility while achieving superior aesthetics and durability.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
              <Image
                src="/assets/images/advanced.jpg"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt="linear board demo"
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
