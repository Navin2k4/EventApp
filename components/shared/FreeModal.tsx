"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface FreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FreeModal: React.FC<FreeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform scale-95 hover:scale-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold  text-gray-800">
            Confirm Your Free Ticket
          </h2>
          <Image
            src="/assets/images/iconlogo.png"
            height={40}
            alt="Website Logo"
            width={40}
          />
        </div>
        <p className="mt-4 mb-4 text-gray-700">
          Are you sure you want to get a free ticket for this event?
        </p>
        <p className="mb-6 text-red-400">*This action cannot be undone</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#1ab964] hover:bg-[#18a258] text-white"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeModal;
