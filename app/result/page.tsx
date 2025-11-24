"use client";
import React, { useRef, useState } from "react";
import { usePhotoContext } from "@/context/PhotoContext";
import html2canvas from "html2canvas";
import { Download, Share2, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const ResultPage = () => {
  const router = useRouter();
  const { photos } = usePhotoContext();

  const polaroidRef = useRef<HTMLDivElement | null>(null);

  const [polaroidText, setPolaroidText] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [shareURL, setShareURL] = useState<string | null>(null);

  const themeConfig = {
    pink: {
      background: "#FEC1ED",
      foreground: "#5E0043",
      card: "#FFE2F7",
      accent: "#FFE2F7",
      "accent-foreground": "#5E0043",
    },
    vintage: {
      background: "#FFF8E7",
      foreground: "#5B4636",
      card: "#F2E4C4",
      accent: "#F2E4C4",
      "accent-foreground": "#5B4636",
    },
  };

  const { resolvedTheme } = useTheme();

  const activeTheme = (resolvedTheme as keyof typeof themeConfig) || "pink";

  const currentColors = themeConfig[activeTheme] || themeConfig.pink;

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

  const handleShare = async () => {
    setIsUploading(true);
    try {
      const imageBlob = await captureImage();
      if (!imageBlob) return;

      const response = await fetch(
        `api/upload?filename=pretty_polaroid_${Date.now()}.png`,
        {
          method: "POST",
          body: imageBlob,
        }
      );

      const resBlob = await response.json();
      const publicUrl = resBlob.url;
      setShareURL(publicUrl);
    } catch (error) {
      console.log("Failed to create link!");
      toast.error("Failed to create shareable link. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePolaroidText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPolaroidText(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL || "");
    toast.success("Shareable link copied to clipboard!");
  };

  return photos.length > 0 ? (
    <div className="resultPage flex justify-center items-center pb-15 pt-10 gap-[10rem]">
      <div
        ref={polaroidRef}
        className="safe-border flex flex-col justify-between items-center h-max w-[10rem] my-5 mx-10"
        style={{
          backgroundColor: "#ffffff",
          color: currentColors.foreground,
          boxShadow:
            "0 10px 20px 5px rgba(0, 0, 0, 0.2), 0 10px 20px 5px rgba(0, 0, 0, 0.2)",
          borderColor: "#e5e7eb",
        }}
      >
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
        <div className="text-center m-4 mt-2">
          <h2 className="font-berk-shwash text-sm mb-1">{polaroidText}</h2>
          <p className="text-[0.6rem]">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div className="rightContainer bg-white shadow-xl/65 rounded-2xl p-6 flex flex-col justify-center items-center h-max gap-6">
        <h3 className="font-berk-shwash text-foreground">
          Customize Your Pretty Polaroid
        </h3>
        <input
          type="text"
          name="customText"
          id="customText"
          placeholder="Enter Custom Text"
          maxLength={20}
          onChange={handlePolaroidText}
          className="bg-accent text-foreground py-2 px-4 rounded-lg font-ubuntu border-2 border-background"
        />
        <div className="flex gap-4">
          <Button onClick={handleDownload} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button onClick={handleShare} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
        {shareURL && (
          <div className="shareLink flex flex-col justify-center items-center">
            <div className="link bg-accent text-foreground font-mono text p-4 rounded-lg w-[20rem] flex flex-col justify-center items-center">
              <h3 className="font-bold wrap-anywhere">
                Link Created :{" "}
                <a href={shareURL} target="_blank" className="font-medium">
                  {shareURL}
                </a>
              </h3>
            </div>
            <Button onClick={handleCopy} className="cursor-pointer mt-4">
              <Link size={30} className="rounded-lg" />
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <div className="errorContainer m-12 p-8 bg-white shadow-lg/65 rounded-2xl h-max w-[20rem]">
        <h3 className="font-berk-shwash text-foreground text-lg text-center p-5">
          Sorry, we can't find any photos. Please click some photos to proceed.
        </h3>
      </div>
      <Button
        onClick={() => router.push("/")}
        className="bg-foreground text-card rounded-lg font-berk-shwash cursor-pointer hover:bg-foreground/85"
      >
        Go Back
      </Button>
    </div>
  );
};

export default ResultPage;
