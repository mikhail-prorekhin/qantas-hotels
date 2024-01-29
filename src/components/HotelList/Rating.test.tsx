import React from "react";
import { render, screen } from '@testing-library/react';
import Rating from "./Rating";

describe("Rating", () => {
    it("display 2.5 stars", () => {
        render(<Rating rating={{value:2.5, type:"star"}} />);
        const fullStars = screen.queryAllByTestId("full-star");
        const halfStars = screen.queryAllByTestId("half-star");
        const emptyStars = screen.queryAllByTestId("empty-star");
        expect(fullStars.length).toBe(2);
        expect(halfStars.length).toBe(1);
        expect(emptyStars.length).toBe(2);
    })
    it("display 0 stars", () => {
        render(<Rating rating={{value:0, type:"star"}} />);
        const fullStars = screen.queryAllByTestId("full-star");
        const halfStars = screen.queryAllByTestId("half-star");
        const emptyStars = screen.queryAllByTestId("empty-star");
        expect(fullStars.length).toBe(0);
        expect(halfStars.length).toBe(0);
        expect(emptyStars.length).toBe(5);
    })
    it("display 1.5 self", () => {
        render(<Rating rating={{value:1.5, type:"self"}} />);
        const fullSelf = screen.queryAllByTestId("full-self");
        const halfSelf= screen.queryAllByTestId("half-self");
        const emptySelf = screen.queryAllByTestId("empty-self");
        expect(fullSelf.length).toBe(1);
        expect(halfSelf.length).toBe(1);
        expect(emptySelf.length).toBe(3);
    })
    it("display 4 self", () => {
        render(<Rating rating={{value:5, type:"self"}} />);
        const fullSelf = screen.queryAllByTestId("full-self");
        const halfSelf= screen.queryAllByTestId("half-self");
        const emptySelf = screen.queryAllByTestId("empty-self");
        expect(fullSelf.length).toBe(5);
        expect(halfSelf.length).toBe(0);
        expect(emptySelf.length).toBe(0);
    })
})