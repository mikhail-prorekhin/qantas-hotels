import React, {  ReactNode } from "react";
import { AppContext } from "src/contexts/AppContext";
import { AsyncContext } from "src/contexts/AsyncContext";
import Pagination from "./Pagination"
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionTypes } from "src/state/reducer";

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


describe("Controls", () => {
    it("render", () => {
        getState.mockReturnValue({ hotels:new Array(20), page:2})
        render(
            <StubProvider>
                <Pagination />
            </StubProvider>
        );
       
        expect(screen.getByText('1').getAttribute("class")).toBe("nav-link")
        expect(screen.getByText('1').getAttribute("href")).toBe("/1")
        expect(screen.getByText('3').getAttribute("class")).toBe("nav-link nav-link__current")
        expect(screen.queryAllByTestId("page-link").length).toBe(3);
        expect(screen.queryAllByTestId("page-current").length).toBe(1);
    })

    it("on select", async () => {
        getState.mockReturnValue({ hotels:new Array(20), page:2})
        startTransitionStub.mockImplementation(fn => fn())
        render(
            <StubProvider>
                <Pagination />
            </StubProvider>
        );

        fireEvent.click(screen.getByText('1'))
        expect(dispatchStub).toHaveBeenCalledWith( {payload: {page: 0}, type: ActionTypes.SetCurrentPage})
    })
})