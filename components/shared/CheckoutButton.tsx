"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Cannot Buy Past events */}
      {hasEventFinished ? (
        <p className="p-2 font-bold text-red-400">
          Tickets are no Longer Available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button
              asChild
              className="bg-[#e41312] hover:bg-[#c00303]"
              size="lg"
            >
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
