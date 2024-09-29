"use client";

import React, { useRef } from "react";
import { useQRCode } from "next-qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface QRCompProps {
  eventId: string;
  eventTitle: string; // Added event title prop
}

const QRComp: React.FC<QRCompProps> = ({ eventId, eventTitle }) => {
  const { SVG } = useQRCode();
  const qrRef = useRef<HTMLDivElement>(null);

  // Function to download the QR code as PDF
  const downloadQRAsPDF = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4", // A4 size
      });

      // Add event title at the top of the page
      pdf.setFontSize(42);
      pdf.text(eventTitle, 105, 20, { align: "center" });

      // Calculate image size to fit on A4
      const imgWidth = 180; // Adjusted image width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Position the QR code in the middle of the page
      const posX = (210 - imgWidth) / 2; // Center horizontally on A4
      const posY = 40; // Position below the title

      pdf.addImage(imgData, "PNG", posX, posY, imgWidth, imgHeight);
      pdf.save(`${eventTitle}_QR_Code.pdf`);
    }
  };

  return (
    <div>
      {/* QR Code with download functionality */}
      <div
        ref={qrRef}
        className="w-[120px] h-[120px] border-2 border-gray-200 rounded-lg overflow-hidden mr-2 cursor-pointer"
        onClick={downloadQRAsPDF} // Click event to download PDF
      >
        {eventId && (
          <SVG
            text={`https://evently-beige-eight.vercel.app/api/event/attend?eventId=${eventId}`}
            options={{
              margin: 2,
              color: {
                dark: "#000000", // Black for the dark sections of the QR code
                light: "#FFFFFF", // White for the light sections
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QRComp;
