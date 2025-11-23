"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { usePhotoContext } from "@/context/PhotoContext";
import html2canvas from "html2canvas";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResultPage = () => {
  const { photos } = usePhotoContext();

  const polaroidRef = useRef<HTMLDivElement | null>(null);

  const captureImage = async (): Promise<Blob | null> => {
    if (!polaroidRef.current) return null;
    const canvas = await html2canvas(polaroidRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  const handleDownload = async () => {
    const blob = await captureImage();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-pretty-polaroid.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resultPage flex justify-center items-center">
    <div ref={polaroidRef} className="safe-print flex flex-col justify-between items-center h-max w-[10rem] my-5 mx-10" 
    style={{ 
      backgroundColor: "#ffffff", 
      color: "#5E0043", 
      boxShadow: "0 10px 20px 5px rgba(0, 0, 0, 0.2), 0 10px 20px 5px rgba(0, 0, 0, 0.2)",
      borderColor: "#e5e7eb"
    }}>
      <div className="grid grid-cols-1 gap-4 p-4">
        {photos.map((photo, index) => (
          <div key={index} className="aspect-square relative overflow-hidden">
            <img
              src={photo}
              alt={`Image ${index}`}
              height={200}
              width={200}
            />
          </div>
        ))}
      </div>
      <div className="text-center m-4">
        <h2 className="font-berk-shwash text-sm">
          A Day to Remember
        </h2>
        <p className="text-xs">
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
    <div className="flex gap-4">
        <Button onClick={handleDownload} className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" /> Save
        </Button>
        <Button className="cursor-pointer">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
