import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import Main from './Main';
import { AppContext } from '../../contexts/AppContext';
import { AsyncContext } from '../../contexts/AsyncContext';
import { requestHotelList } from "src/services/loadHotelList";

jest.mock("src/services/loadHotelList");


const dispatchStub = jest.fn()
const getState = jest.fn()

const startTransitionStub = jest.fn();
const getPending = jest.fn()



const StubProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AppContext.Provider value={{ state: getState(), dispatch: dispatchStub }}>
            <AsyncContext.Provider value={{ isPending: getPending(), startTransition: startTransitionStub }}>
                {children}
            </AsyncContext.Provider>
        </AppContext.Provider>
    );
};
describe("Main", () => {
    it("if request in progress", () => {
        getState.mockReturnValue({ requestInProgress: true })
        render(
            <StubProvider>
                <Main />
            </StubProvider>

        );
        expect(requestHotelList).toHaveBeenCalledWith(dispatchStub)
        expect(screen.getByTestId('hotel-list-placeholder')).toBeInTheDocument();
        expect(screen.queryAllByTestId('hotel-placeholder').length).toBe(5);
    })

    it("if asyc rendering pending", () => {
        getState.mockReturnValue({ requestInProgress: false })
        getPending.mockReturnValue(true)
        render(
            <StubProvider>
                <Main />
            </StubProvider>

        );
        expect(requestHotelList).toHaveBeenCalledWith(dispatchStub)
        expect(screen.getByTestId('hotel-list-placeholder')).toBeInTheDocument();
        expect(screen.queryAllByTestId('hotel-placeholder').length).toBe(5);
    })


    it("network failed", () => {
        getState.mockReturnValue({ requestInProgress: false, requestStatusSeccessed: false })
        render(
            <StubProvider>
                <Main />
            </StubProvider>

        );
        expect(requestHotelList).toHaveBeenCalledWith(dispatchStub)
        expect(screen.getByTestId("network-error")).toBeInTheDocument();
    })

    it("render hotel list", () => {
        getState.mockReturnValue({ requestInProgress: false, requestStatusSeccessed:true, hotels:[], sortedList:[] })
        getPending.mockReturnValue(false)
        render(
            <StubProvider>
                <Main />
            </StubProvider>

        );
        expect(requestHotelList).toHaveBeenCalledWith(dispatchStub)
        expect(screen.getByTestId("main-container")).toBeInTheDocument();
    })

})

