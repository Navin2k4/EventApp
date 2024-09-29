import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional class names

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      )}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
