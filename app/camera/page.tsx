"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { usePhotoContext } from "@/context/PhotoContext";

const cameraPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shotsCount = Number(searchParams.get("shotsCount")) || 0;

  const { photos, setPhotos } = usePhotoContext();

  const columns = shotsCount > 0 ? shotsCount : Math.max(1, photos.length);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 350, height: 350 } })
      .then((stream) => {
        let video = videoRef.current;
        if(video){
            video.srcObject = stream;
            video.play();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const takePhoto = () => {
    if (shotsCount <= photos.length) {
      alert("No more shots available!");
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
      ctx?.drawImage(video!, 0, 0, width, height);

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
    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

}, [photos]);

  return (
    <div className="camera-page flex justify-around items-center">
      <div className="frame my-10 px-8 pt-8 bg-[#4B4848] rounded-2xl shadow-lg/85">
        <div className="camera flex flex-col items-center justify-center">
          <video ref={videoRef}></video>
          <div className="btnGroup flex justify-around items-center py-5 mx-auto gap-5">
            <button onClick={retakePhoto} disabled={!canRetake} className="cursor-pointer">
              <Image
                src="/retakeBtn.png"
                alt="Retake Image"
                width={70}
                height={70}
              />
            </button>
            <button onClick={takePhoto} className="cursor-pointer">
              <Image
                src="/shutterBtn.png"
                alt="Take Image"
                width={70}
                height={70}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="preview flex flex-col justify-center items-center my-10 px-8 py-5 bg-card rounded-2xl shadow-lg/65 w-[25rem]">
        <h3 className="text-foreground text-center font-berk-shwash text-lg mb-3">Preview</h3>
        <canvas ref={photoRef}>   
        </canvas>
        <br />
        <div
          className="photos-preview grid gap-2 mb-5"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {photos.map((photo, idx) => (
            <img key={idx} src={photo} alt={`shot-${idx}`} width={100} height={100} className="border-4 border-card"/>
          ))}
        </div>

        <button onClick={() => router.push('/result')} disabled={photos.length != shotsCount} className="font-berk-shwash text-background bg-foreground rounded-2xl py-3 px-8 cursor-pointer hover:bg-foreground/85">Customize My Photos</button>
      </div>
    </div>
  );
};

export default cameraPage;
