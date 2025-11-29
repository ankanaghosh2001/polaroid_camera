"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { usePhotoContext } from "@/context/PhotoContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

const filterConfig = {
  // Pink Theme: Y2K Vibe (High saturation, brightness, slight pink tint)
  pink: {
    css: "contrast(1.2) saturate(1.5) brightness(1.1)", // The CSS filter string
    tintColor: "rgba(255, 138, 181, 0.153)", // A see-through pink layer
  },

  // Vintage Theme: Old School (Sepia, lower contrast, warm tint)
  vintage: {
    css: "sepia(0.5) contrast(1.2) brightness(0.9) saturate(0.8)",
    tintColor: "rgba(210, 180, 140, 0.12)", // A see-through tan/brown layer
  }
};

const cameraPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shotsCount = Number(searchParams.get("shotsCount")) || 0;

  const { photos, setPhotos } = usePhotoContext();

  const columns = shotsCount > 0 ? shotsCount : Math.max(1, photos.length);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const { resolvedTheme } = useTheme();
  const activeTheme = (resolvedTheme as keyof typeof filterConfig) || "pink";
  const currentFilter = filterConfig[activeTheme];

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 350, height: 350 } })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const takePhoto = () => {
    if (shotsCount <= photos.length) {
      toast.error("No more shots available!");
      return;
    }

    const height = 200;
    const width = 200;

    let video = videoRef.current;
    let photo = photoRef.current;

    if (video && photo) {
      photo!.width = width;
      photo!.height = height;

      let ctx = photo!.getContext("2d");
      if (!ctx) return;

      // --- MIRRORING LOGIC ---
      // 1. Save the current state
      ctx.save();
      // 2. Move the origin to the top-right corner
      ctx.translate(width, 0);
      // 3. Flip the coordinate system horizontally
      ctx.scale(-1, 1);
      // --- END MIRRORING LOGIC ---

      // Apply filter if not "none"
      if (currentFilter.css !== "none") {
        ctx.filter = currentFilter.css;
      }

      ctx?.drawImage(video!, 0, 0, width, height);
      ctx.filter = "none"; // Reset filter for tinting

      if (currentFilter.tintColor !== "transparent") {
        ctx.fillStyle = currentFilter.tintColor;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore(); // Restore to original state

      const dataUrl = photo!.toDataURL("Image/png");
      setPhotos((prev) => [...prev, dataUrl]);
    }
  };

  const retakePhoto = () => {
    setPhotos((prev) => prev.slice(0, -1));
  };

  const canRetake = photos.length > 0;

  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    const canvas = photoRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (photos.length === 0) {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const lastPhotoStr = photos[photos.length - 1];
    const img = new window.Image();
    img.src = lastPhotoStr;
    img.onload = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [photos]);

  return (
    <div className="camera-page flex flex-col lg:flex-row justify-around items-center">
      <motion.div
        className="frame my-10 px-8 pt-8 bg-[#4B4848] rounded-2xl shadow-lg/85 mx-5 lg:mx-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeIn", duration: 0.7 }}
      >
        <div className="camera flex flex-col items-center justify-center">
          <video
            ref={videoRef}
            className="-scale-x-100"
            // apply filter to video element
            style={{
              filter: currentFilter.css,
            }}
          ></video>
          {/* Tint Overlay */}
          <div 
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: currentFilter.tintColor }}
          />
          <div className="btnGroup flex justify-around items-center py-5 mx-auto gap-5">
            <motion.button
              onClick={retakePhoto}
              disabled={!canRetake}
              className="cursor-pointer"
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            >
              <Image
                src="/retakeBtn.png"
                alt="Retake Image"
                width={70}
                height={70}
              />
            </motion.button>
            <motion.button
              onClick={takePhoto}
              className="cursor-pointer"
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            >
              <Image
                src="/shutterBtn.png"
                alt="Take Image"
                width={70}
                height={70}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div className="preview flex flex-col justify-center items-center my-10 px-8 py-5 bg-white rounded-2xl shadow-lg/65 w-max lg:w-100 mx-50 mb-30 lg:mx-0 lg:mb-0">
        <h3 className="text-foreground text-center font-berk-shwash text-lg mb-3">
          Preview
        </h3>
        <canvas ref={photoRef} className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"/>
        <br />
        <div
          className="photos-preview grid gap-2 mb-5"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`shot-${idx}`}
              className="border-4 border-card rounded-lg w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]"
            />
          ))}
        </div>

        <motion.button
          onClick={() => {
            if (photos.length != shotsCount) {
              toast.error(
                `Please take all ${shotsCount} shots before proceeding!`
              );
              return;
            }
            router.push("/result");
          }}
          className="font-berk-shwash text-card bg-foreground rounded-xl lg:rounded-2xl py-2 px-5 lg:py-3 lg:px-8 cursor-pointer hover:bg-foreground/85 text-[0.7rem] lg:text-[1rem]"
          whileHover={{ scale: 1.05, transition: { ease: "easeInOut" } }}
        >
          Customize My Photos
        </motion.button>
      </div>
    </div>
  );
};

export default cameraPage;
