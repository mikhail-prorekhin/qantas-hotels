import React from "react";
import HotelDetails from "./HotelDetails"
import { render, screen } from "@testing-library/react";
import { HotelData } from "src/types/HotedDataTypes";
import { DecodedUrl } from "src/types/UrlDefenceTypes";

describe("HotelDetails", () => {

   const hotel = {
      id: "-id-",
      heroImage: "https://urldefense.com/img1",
      name: "Garden Bungalow",
      location: {
         city: "Cairns",
         country: "Australia"
      },
      rating: {
         value: 1,
         type: "self"
      },
      inclusions: [
         "Free WiFi",
         "Airport Shuttle"
      ],
      price: {
         total: {
            amount: 500.00,
            currency: "EUR"
         },
         stay: {
            checkIn: "2024-01-01",
            checkout: "2024-01-06",
            adults: 2,
            children: 0,
            infants: 0
         }
      },
      sleep: 2
   } as HotelData



   it("render no images", () => {
      render(<HotelDetails hotel={hotel} />)
      expect(screen.getByText("Garden Bungalow")).toBeInTheDocument();
      expect(screen.getByText("Cairns")).toBeInTheDocument();
      expect(screen.getByText("Free WiFi")).toBeInTheDocument();
      expect(screen.getByText( "Airport Shuttle")).toBeInTheDocument();

      expect(screen.queryAllByTestId("full-self").length).toBe(1);
      expect(screen.queryAllByTestId("half-self").length).toBe(0);
      expect(screen.queryAllByTestId("empty-self").length).toBe(4);

      expect(screen.getByText( "1 night from [EUR]")).toBeInTheDocument();
      expect(screen.getByText( "100")).toBeInTheDocument();
      
      expect(screen.getByTestId('hero-image-loading')).toBeInTheDocument();
   })

   it("render with image", () => {
      render(<HotelDetails hotel={hotel} images={new Map([["https://urldefense.com/img1", { decodedUrl: "https://urldefense.com/decoded-img1" } as unknown as DecodedUrl]])} />)
      const element = screen.getByTestId('hero-image')
      expect(element).toBeInTheDocument();
      expect(element.getAttribute("src")).toEqual("https://urldefense.com/decoded-img1");
      expect(element.getAttribute("class")).toEqual("object-contain  object-cover  md:object-cover object-center md:w-52  md:basis-52 grow-0 shrink-0 w-full h-32 md:h-52 rounded-t-md md:rounded-none  md:rounded-l-md ");
   })

   it("render with absend image", () => {
      render(<HotelDetails hotel={hotel} images={new Map([])} />)
      const element = screen.getByTestId('hero-image')
      expect(element).toBeInTheDocument();
      expect(element.getAttribute("src")).toEqual("/image-not-found.png");
      expect(element.getAttribute("class")).toEqual("object-contain    md:object-cover object-center md:w-52  md:basis-52 grow-0 shrink-0 w-full h-32 md:h-52 rounded-t-md md:rounded-none  md:rounded-l-md ");
   })
})