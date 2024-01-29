import React from "react";
import { render, screen } from '@testing-library/react';
import NetworkError from "./NetworkError";

describe("NetworkError", () => {
    it("display  message", () => {
        render(<NetworkError />);
        const message = screen.getByText(/System error, please try latter/i);
        expect(message).toBeInTheDocument();
    })
})