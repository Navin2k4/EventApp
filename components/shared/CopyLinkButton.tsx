"use client"; // Ensure this component is client-side

import { useState } from "react";
import { Share2 } from "lucide-react";

interface CopyLinkButtonProps {
  eventId: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ eventId }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    const eventLink = `${window.location.origin}/events/${eventId}`;
    
    // Play sound when copying
    const audio = new Audio("/assets/sounds/copy-sound.mp3");
    audio.volume = 0.3; // Set the volume (0.0 to 1.0, e.g., 30% volume)
    audio.play();

    navigator.clipboard.writeText(eventLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy the event link:", err);
      });
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopyLink}
        className="absolute top-4 right-4 bg-white/80 hover:bg-white shadow-xl p-2 rounded-full transition-all duration-300"
      >
        <Share2 className="h-4 w-4 text-gray-800" />
      </button>

      {/* Smooth pop-out effect for 'Copied!' text */}
      <span
        className={`absolute top-5 right-[52px] text-xs text-black transition-all duration-300 transform ${
          isCopied ? "opacity-9 translate-x-0 scale-100" : "opacity-0 translate-x-4 scale-75"
        } bg-green-400 px-3 py-1 rounded-full shadow-lg border border-green-300 font-semibold`}
      >
        Copied!
      </span>
    </div>
  );
};

export default CopyLinkButton;
