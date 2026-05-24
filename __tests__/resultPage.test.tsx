import React, { JSX } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ResultPage from "@/app/result/page";
import { PhotoProvider } from "@/context/PhotoContext";
import { Toaster } from "@/components/ui/sonner";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => {
    return <button {...props}>{children}</button>;
  },
}));

jest.mock("html2canvas", () => ({
  __esModule: true,

  default: jest.fn(() =>
    Promise.resolve({
      toBlob: (callback: any) => {
        callback(new Blob(["mock-image"]));
      },
    }),
  ),
}));

jest.mock("@/context/PhotoContext", () => ({
  usePhotoContext: () => ({
    photos: ["mock-photo"],
  }),

  PhotoProvider: ({ children }: any) => children,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe("ResultPage", () => {
  it("creates shareable link successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            url: "https://mock-url.com",
          }),
      } as Response),
    );

    render(
      <PhotoProvider>
        <ResultPage />
      </PhotoProvider>,
    );

    const shareButton = screen.getByRole("button", {
      name: /share/i,
    });

    await waitFor(() => {
      expect(shareButton).not.toBeDisabled();
    });

    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  it("shows error toast when share fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Upload failed")));

    render(
      <>
        <Toaster />
        <PhotoProvider>
          <ResultPage />
        </PhotoProvider>
      </>,
    );

    const shareButton = screen.getByRole("button", {
      name: /share/i,
    });

    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to create shareable link/i),
      ).toBeInTheDocument();
    });
  });

  it("downloads the generated image", async () => {
    const clickMock = jest.fn();

    global.URL.createObjectURL = jest.fn(() => "mock-url");

    const originalCreateElement = document.createElement.bind(document);

    jest.spyOn(document, "createElement").mockImplementation((tagName) => {
      if (tagName === "a") {
        const anchor = originalCreateElement("a");

        anchor.click = clickMock;

        return anchor;
      }

      return originalCreateElement(tagName);
    });

    render(
      <PhotoProvider>
        <ResultPage />
      </PhotoProvider>,
    );

    const saveButton = screen.getByRole("button", {
      name: /save/i,
    });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(clickMock).toHaveBeenCalled();
    });
  });
});
