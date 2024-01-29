import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "./Controls";
import { AppContext } from "src/contexts/AppContext";
import { AsyncContext } from "src/contexts/AsyncContext";
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
        getState.mockReturnValue({ settings: { sort: "descendant" } })
        render(
            <StubProvider>
                <Controls />
            </StubProvider>
        );
        expect(screen.getByText('Highest Price').getAttribute("aria-selected")).toBe("true")
        expect(screen.getByText('Lowest Price').getAttribute("aria-selected")).toBe("false")
    })

    it("on select", async () => {
        getState.mockReturnValue({ settings: { sort: "descendant" } })
        startTransitionStub.mockImplementation(fn => fn())
        render(
            <StubProvider>
                <Controls />
            </StubProvider>
        );

        fireEvent.change(screen.getByTestId('sort'), { target: { value: "ascendant" } })
        expect(dispatchStub).toHaveBeenCalledWith( {payload: {sort: "ascendant"}, type: ActionTypes.SetSortingDirection})
    })
})