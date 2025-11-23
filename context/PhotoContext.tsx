"use client";

import React, { createContext, useContext, useState } from "react";

interface PhotoContextType {
  photos: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export function PhotoProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<string[]>([]);

  return (
    <PhotoContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotoContext() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotoContext must be used within a PhotoProvider");
  }
  return context;
}