import React, { ReactNode } from "react";
import HoteDatelList from "./HotelList"
import { render, screen } from "@testing-library/react";
import { AppContext } from "src/contexts/AppContext";

const dispatchStub = jest.fn()
const getState = jest.fn()

const StubProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{ state: getState(), dispatch: dispatchStub }}>
            {children}
        </AppContext.Provider>
    );
};

describe("HoteDatelList", () => {
    it("render list", () => {
        getState.mockReturnValue({
            sortedList: [
                {
                    "id": "5454a06b-854f-4604-b60d-c6bfd064b1db",
                    "heroImage": "https://urldefense.com/v3/__https://picsum.photos/id/92/400/300__;!!PUxuPyJo!xMPbze75LRKpcxrAU6IDcCUek89k41P_mNqMw5cXRtlMi2qibLulibnx-9BEjc8aaUeK45_iH08buUQUbZjqAbmd6Pi09nw$ ",
                    "name": "Garden Bungalow",
                    "location": {
                        "city": "Cairns",
                        "country": "Australia"
                    },
                    "rating": {
                        "value": 1,
                        "type": "self"
                    },
                    "inclusions": [
                        "Free WiFi",
                        "Airport Shuttle"
                    ],
                    "price": {
                        "total": {
                            "amount": "500.00",
                            "currency": "AUD"
                        },
                        "stay": {
                            "checkIn": "2024-01-01",
                            "checkout": "2024-01-02",
                            "adults": 2,
                            "children": 0,
                            "infants": 0
                        }
                    },
                    "sleep": 2
                },
                {
                    "id": "b4a6ad7c-88f5-452c-be4b-b2f245ac7083",
                    "heroImage": "https://urldefense.com/v3/__https://picsum.photos/id/62/400/300__;!!PUxuPyJo!xMPbze75LRKpcxrAU6IDcCUek89k41P_mNqMw5cXRtlMi2qibLulibnx-9BEjc8aaUeK45_iH08buUQUbZjqAbmdsXarwEg$ ",
                    "name": "Country Lodge",
                    "location": {
                        "city": "Melbourne",
                        "country": "Australia"
                    },
                    "rating": {
                        "value": 0,
                        "type": "star"
                    },
                    "inclusions": [
                        "Pool"
                    ],
                    "price": {
                        "total": {
                            "amount": "484.00",
                            "currency": "AUD"
                        },
                        "stay": {
                            "checkIn": "2024-01-01",
                            "checkout": "2024-01-02",
                            "adults": 2,
                            "children": 0,
                            "infants": 0
                        }
                    },
                    "sleep": 2
                },
            ],
            page:0
        })
        render(
            <StubProvider>
                <HoteDatelList />
            </StubProvider>
        );
        expect(screen.queryAllByTestId('hotel-detail').length).toBe(2);
    })
})

