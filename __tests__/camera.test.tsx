import React, { JSX } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CameraPage from "@/app/camera/page";
import { PhotoProvider } from "@/context/PhotoContext";

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  useSearchParams: () => ({
    get: jest.fn(() => "3") // Mocking shotsCount as 3
  })
}))

Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: jest.fn(),
    }),
  },
})

jest.mock('motion/react', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) => {
        return ({
          children,
          ...props
        }: any) => {

          const Component =
            tag as keyof JSX.IntrinsicElements

          const filteredProps = { ...props }

          delete filteredProps.initial
          delete filteredProps.animate
          delete filteredProps.transition
          delete filteredProps.whileHover
          delete filteredProps.whileTap
          delete filteredProps.exit

          return (
            <Component {...filteredProps}>
              {children}
            </Component>
          )
        }
      },
    }
  ),
}))

describe("CameraPage", () => {
  it("mirrors camera preview is enabled", () => {
    render(
    <PhotoProvider>
      <CameraPage />
    </PhotoProvider>
    );
    const video = screen.getByTestId("camera-preview");
    expect(video).toHaveClass("-scale-x-100");
  });
});
